const imagens = [
  {
    src: "./assets/carrossel/campo-lavinia.webp",
    legenda:
      "Campo da escolinha do Lavínia, em São Bernardo do Campo, onde minha relação com o futebol começou.",
  },
  {
    src: "./assets/carrossel/maua01.jpg",
    legenda: "Estreia no Campeonato Paulista Sub-15 defendendo o Mauá FC.",
  },
  {
    src: "./assets/carrossel/maua02.jpg",
    legenda: "Meu primeiro clássico pelo Mauá: Mauá FC x Mauaense FC.",
  },
  {
    src: "./assets/carrossel/independente01.jpg",
    legenda:
      "Campeão da Copa São Bernardo Sub-18 em 2023 pelo Independente FC.",
  },
  {
    src: "./assets/carrossel/independente02.jpg",
    legenda:
      "Comemoração do título da Copa São Bernardo Sub-18, um dos momentos mais marcantes da minha trajetória.",
  },
  {
    src: "./assets/carrossel/unidos01.jpg",
    legenda:
      "Em 2024, convidado pelo XI Unidos para disputar a Liga Municipal de Diadema.",
  },
  {
    src: "./assets/carrossel/unidos02.jpg",
    legenda:
      "Primeiro treino com o elenco do XI Unidos na preparação para a temporada.",
  },
];

const imgCarrossel = document.getElementById("carrossel-img");
const legenda = document.getElementById("legenda");

imgCarrossel.src = imagens[0].src;
legenda.innerText = imagens[0].legenda;

function carrossel() {
  if (imgCarrossel.classList.contains("saindo")) return;

  imgCarrossel.classList.add("saindo");

  // https://developer.mozilla.org/pt-BR/docs/Web/API/EventTarget/addEventListener
  // https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventListener

  imgCarrossel.addEventListener(
    "animationend",
    () => {
      let primeiroValor = imagens.shift();
      imagens.push(primeiroValor);

      imgCarrossel.src = imagens[0].src;
      legenda.innerText = imagens[0].legenda;
      imgCarrossel.classList.remove("saindo");
    },
    { once: true },
  );
}

setInterval(() => {
  carrossel();
}, 3000);
