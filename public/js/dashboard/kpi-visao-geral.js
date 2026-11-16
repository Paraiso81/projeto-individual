const temporadas = JSON.parse(sessionStorage.getItem("TODAS_TEMPORADAS"));

const qtdTemporadas = document.getElementById("kpiQtdTemporadas");
const qtdPartidas = document.getElementById("kpiPartidas");

const qtdGols = document.getElementById("kpiGols");
const qtdGolsTempAtual = document.getElementById("apoioKpiGols");

const qtdAssistencias = document.getElementById("kpiAssistencias");
const qtdAssistTempAtual = document.getElementById("apoioKpiAssistencias");

const mediaGolsKpi = document.getElementById("kpiMediaGols");
const GAporJogo = document.getElementById("apoioKpiMedia");

function listarKpis() {
  qtdTemporadas.innerText =
    temporadas.length == 0 ? "0 temp." : `${temporadas.length} temp.`;

  let totalPartidas = 0;
  let totalGols = 0;
  let totalGolsTempAtual = 0;
  let totalAssistencias = 0;
  let totalAssistTempAtual = 0;

  for (let i = 0; i < temporadas.length; i++) {
    let temporada = temporadas[i];
    totalPartidas += temporada.partidas.length;

    if (anoAtual == temporada.ano) {
      totalGolsTempAtual = temporada.partidas.gols;
      totalAssistTempAtual = temporada.partidas.assistencias;
    }

    for (let j = 0; j < temporada.partidas[j]; j++) {
      let partida = temporada.partidas[j];
      totalGols += partida.gols;
      totalAssistencias += partida.assistencias;
    }
  }

  let mediaGols = 0;
  let mediaGA = 0;

  if (gols > 0 && totalAssistencias > 0 && qtdPartidas > 0) {
    mediaGols = (totalGols / qtdPartidas).Math.round(2);
    mediaGA = ((totalGols + totalAssistencias) / qtdPartidas).Math.round(2);
  }

  qtdPartidas.innerText = totalPartidas;
  qtdGols.innerText = totalGols;
  qtdGolsTempAtual.innerText =
    totalGolsTempAtual > 0
      ? `+${totalGolsTempAtual} gol na temporada ${anoAtual}`
      : "Nenhum gols registrado";
  qtdAssistencias.innerText = totalAssistencias;
  qtdAssistTempAtual.innerText =
    totalAssistTempAtual > 0
      ? `+${totalAssistTempAtual} na temporada ${anoAtual}`
      : "Nenhuma assistência registrada";
  mediaGolsKpi.innerText = mediaGols > 0 ? `${mediaGols.replace(".", ",")}` : 0;
  GAporJogo.innerText =
    GAporJogo > 0 ? `Média G+A: ${GAporJogo.replace(".", ",")} por jogo` : "Sem dados de GA";
}

document.addEventListener("DOMContentLoaded", () => {
  listarKpis();
});
