document.addEventListener("DOMContentLoaded", () => {
  const statusDot = document.querySelector('.status-dot');
  const statusText = document.querySelector('.status span');
  const balanceElement = document.querySelector('.balance');
  const txList = document.querySelector('.tx-list');

  // Simulación de conexión
  const isConnected = true;
  const balance = 15432.89;
  const transactions = [
    { type: 'received', amount: 500, network: 'nexora', time: '2 min ago' },
    { type: 'sent', amount: 250, network: 'ethereum', time: '1 hora ago' },
    { type: 'received', amount: 1000, network: 'tron', time: '3 horas ago' }
  ];

  if (isConnected) {
    statusDot.classList.add('online');
    statusText.textContent = 'Online';
  } else {
    statusDot.classList.add('offline');
    statusText.textContent = 'Offline';
  }

  balanceElement.textContent = `$${balance.toLocaleString()}`;

  transactions.forEach(tx => {
    const div = document.createElement('div');
    div.className = 'tx-item';
    div.innerHTML = `
      <span>${tx.type === 'received' ? '+' : '-'}$${tx.amount}</span>
      <span>${tx.network} • ${tx.time}</span>
    `;
    txList.appendChild(div);
  });

  // Navegación inferior simulada
  const buttons = document.querySelectorAll('.bottom-nav button');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      alert(`Navegando a: ${btn.dataset.tab}`);
    });
  });
});
