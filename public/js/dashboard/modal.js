const dataPartida = document.getElementById("iptDataPartida");
const adversario = document.getElementById("iptAdversarioPartida");
const gols = document.getElementById("qtdGolsPartida");
const assistencias = document.getElementById("qtdAssistenciasPartida");

window.abrirModal = (modalId) => {
  let modal = document.getElementById(modalId);

  modal.style.display = "block";
};

window.closeModal = (modalId) => {
  let modal = document.getElementById(modalId);
  console.log(modal.id, "let modal");
  if (modal.id === "overlayCriarPartida") {
    dataPartida.value = "";
    adversario.value = "";
    gols.innerText = 0;
    assistencias.innerText = 0;
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
