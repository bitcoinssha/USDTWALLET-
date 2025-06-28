document.addEventListener("DOMContentLoaded", () => {
  // Actualiza la hora cada segundo
  setInterval(() => {
    const now = new Date();
    const time = now.toLocaleTimeString();
    const reloj = document.getElementById("clock");
    if (reloj) reloj.textContent = time;
  }, 1000);

  // Cambiar de red visualmente
  const networkItems = document.querySelectorAll(".network-grid div");
  networkItems.forEach(item => {
    item.addEventListener("click", () => {
      networkItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
    });
  });

  // Botones de navegación inferior
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Copiar dirección al portapapeles
  const copiarBtn = document.getElementById("copiarDireccion");
  if (copiarBtn) {
    copiarBtn.addEventListener("click", () => {
      const direccion = document.getElementById("direccionNexora").textContent;
      navigator.clipboard.writeText(direccion).then(() => {
        copiarBtn.textContent = "Copiado ✔️";
        setTimeout(() => {
          copiarBtn.textContent = "Copiar Dirección";
        }, 2000);
      });
    });
  }

  // Simular envío (por ahora solo visual)
  const enviarBtn = document.getElementById("enviarBtn");
  if (enviarBtn) {
    enviarBtn.addEventListener("click", () => {
      const destino = document.getElementById("destinoInput").value;
      const cantidad = document.getElementById("cantidadInput").value;

      if (destino && cantidad) {
        alert(`Simulado: Enviando ${cantidad} USDT a ${destino}`);
        // Aquí puedes añadir la lógica real de Web3 si deseas
        document.getElementById("destinoInput").value = "";
        document.getElementById("cantidadInput").value = "";
      } else {
        alert("Por favor completa ambos campos.");
      }
    });
  }
});
