const imagens = [
  { src: "./assets/campo-lavinia.webp" },
  { src: "./assets/bg-main.webp" },
];

const imgCarrossel = document.getElementById("carrossel-img");

function carrossel() {
  if (imgCarrossel.classList.contains("saindo")) return;

  imgCarrossel.classList.add("saindo");

  // https://developer.mozilla.org/pt-BR/docs/Web/API/EventTarget/addEventListener
  // https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventListener
  
  imgCarrossel.addEventListener(
    "animationend",
    () => {
      let ultimoValor = imagens.pop();
      imagens.unshift(ultimoValor);

      imgCarrossel.src = imagens[0].src;
      imgCarrossel.classList.remove("saindo");
    },
    { once: true },
  );
}

setInterval(() => {
  carrossel();
}, 3000);
