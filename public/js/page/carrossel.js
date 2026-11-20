const imagens = [
  { src: "./assets/campo-lavinia.webp" },
  { src: "./assets/bg-main.webp" },
];

const imgCarrossel = document.getElementById("carrossel-img");

function carrossel() {
  let ultimoValor = imagens.pop();

  let inserirPrimeiroValor = imagens.unshift(ultimoValor);
  console.log(inserirPrimeiroValor, "inserir valor");
  console.log(imagens[0], "primeiro valor");
  console.log(imagens[0].src, "url");
  imgCarrossel.src = imagens[0].src;
}

setInterval(() => {
  carrossel();
}, 3000);
