const provider = new ethers.JsonRpcProvider("https://rpc.nexora.network");
let wallet;

function initWallet() {
    const storedKey = localStorage.getItem("nexoraKey");
    if (storedKey) {
        const decrypted = CryptoJS.AES.decrypt(storedKey, "clave-secreta").toString(CryptoJS.enc.Utf8);
        wallet = new ethers.Wallet(decrypted, provider);
        updateUI();
    } else {
        wallet = ethers.Wallet.createRandom().connect(provider);
        const encrypted = CryptoJS.AES.encrypt(wallet.privateKey, "clave-secreta").toString();
        localStorage.setItem("nexoraKey", encrypted);
        alert("Wallet creada: " + wallet.address);
        updateUI();
    }
}

async function updateUI() {
    document.getElementById("walletAddress").innerText = wallet.address;
    const balance = await provider.getBalance(wallet.address);
    document.getElementById("mainBalance").innerText = ethers.formatEther(balance);
}

function copyAddress() {
    navigator.clipboard.writeText(wallet.address);
    alert("Dirección copiada.");
}

function openNetworkModal() {
    alert("Pronto podrás cambiar de red.");
}

function openAccountModal() {
    alert("Funciones de cuenta próximamente.");
}

function openReceiveModal() {
    alert("Función de recibir tokens próximamente.");
}

function openSendModal() {
    const to = prompt("Dirección destino:");
    const amount = prompt("Cantidad NXR:");
    if (ethers.isAddress(to) && parseFloat(amount) > 0) {
        sendTransaction(to, amount);
    } else {
        alert("Datos inválidos.");
    }
}

async function sendTransaction(to, amount) {
    try {
        const tx = await wallet.sendTransaction({
            to,
            value: ethers.parseEther(amount)
        });
        alert("Enviado: " + tx.hash);
        await tx.wait();
        updateUI();
    } catch (err) {
        alert("Error: " + err.message);
    }
}

initWallet();
