const breadCrumb = document.getElementById("breadcrumbNomeTemporada");
const nomeTemporadaTitulo = document.getElementById("nomeTemporadaTitulo");
const anoTemporadaBadge = document.getElementById("anoTemporadaBadge");

async function exibirDadosHeader() {
  const dadosTemporada = await buscarTemporada();
  console.log(dadosTemporada, `dados temporada`);
  const temporada = dadosTemporada[0];

  breadCrumb.innerText = temporada.nome;
  nomeTemporadaTitulo.innerText = temporada.nome;
  anoTemporadaBadge.innerText = `Ano: ${temporada.ano}`;
}

document.addEventListener("DOMContentLoaded", () => {
  exibirDadosHeader();
});
