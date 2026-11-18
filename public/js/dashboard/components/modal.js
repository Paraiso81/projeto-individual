window.abrirModal = (modalId) => {
  let modal = document.getElementById(modalId);
  console.log(modal);
  modal.style.display = "block";
};

window.closeModal = (modalId) => {
  let modal = document.getElementById(modalId);
  if (modal.id === "overlayCriarPartida") {
    const campoData = document.querySelector(
      "#overlayCriarPartida #iptDataPartida",
    );
    const campoAdversario = document.querySelector(
      "#overlayCriarPartida #iptAdversarioPartida",
    );
    const campoGols = document.querySelector(
      "#overlayCriarPartida #qtdGolsPartida",
    );
    const campoAssistencias = document.querySelector(
      "#overlayCriarPartida #qtdAssistenciasPartida",
    );

    if (campoData) campoData.value = "";
    if (campoAdversario) campoAdversario.value = "";
    if (campoGols) campoGols.innerText = "0";
    if (campoAssistencias) campoAssistencias.innerText = "0";
  }

  modal.style.display = "none";
};

window.alterarContador = (idElemento, delta) => {
  let elemento = document.getElementById(idElemento);
  let valorAtual = Number(elemento.innerText) || 0;
  let novoValor = valorAtual + delta;

  if (novoValor >= 0) {
    elemento.innerText = novoValor;
  }
};
