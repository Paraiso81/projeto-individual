const qtdTemporadas = document.getElementById("kpiQtdTemporadas");
const qtdPartidas = document.getElementById("kpiPartidas");

const qtdGols = document.getElementById("kpiGols");
const qtdGolsTempAtual = document.getElementById("apoioKpiGols");

const qtdAssistencias = document.getElementById("kpiAssistencias");
const qtdAssistTempAtual = document.getElementById("apoioKpiAssistencias");

const mediaGolsKpi = document.getElementById("kpiMediaGols");
const GAporJogo = document.getElementById("apoioKpiMedia");

function listarKpis(temporadas) {
  const listaTemporadas = temporadas || [];

  qtdTemporadas.innerText =
    listaTemporadas.length === 0
      ? "0 temp."
      : `${listaTemporadas.length} temp.`;

  let totalPartidas = 0;
  let totalGols = 0;
  let totalGolsTempAtual = 0;
  let totalAssistencias = 0;
  let totalAssistTempAtual = 0;

  for (let i = 0; i < listaTemporadas.length; i++) {
    const temporada = listaTemporadas[i];
    const partidas = temporada.partidas || [];
    const ehTemporadaAtual = Number(temporada.ano) === anoAtual;

    totalPartidas += partidas.length;

    for (let j = 0; j < partidas.length; j++) {
      const partida = partidas[j];
      const golsPartida = Number(partida.gols) || 0;
      const assistPartida = Number(partida.assistencias) || 0;

      totalGols += golsPartida;
      totalAssistencias += assistPartida;

      if (ehTemporadaAtual) {
        totalGolsTempAtual += golsPartida;
        totalAssistTempAtual += assistPartida;
      }
    }
  }

  let mediaGols = 0;
  let mediaGA = 0;

  if (totalPartidas > 0) {
    mediaGols = totalGols / totalPartidas;
    mediaGA = (totalGols + totalAssistencias) / totalPartidas;
  }

  qtdPartidas.innerText = totalPartidas;
  qtdGols.innerText = totalGols;
  qtdGolsTempAtual.innerText =
    totalGolsTempAtual > 0
      ? `+${totalGolsTempAtual} gol na temporada ${anoAtual}`
      : "Nenhum gol registrado";
  qtdAssistencias.innerText = totalAssistencias;
  qtdAssistTempAtual.innerText =
    totalAssistTempAtual > 0
      ? `+${totalAssistTempAtual} na temporada ${anoAtual}`
      : "Nenhuma assistência registrada";
  mediaGolsKpi.innerText =
    mediaGols > 0 ? mediaGols.toFixed(2).replace(".", ",") : "0";
  GAporJogo.innerText =
    mediaGA > 0
      ? `Média G+A: ${mediaGA.toFixed(2).replace(".", ",")} por jogo`
      : "Sem dados de GA";
}

async function atualizarDashboardVisaoGeral() {
  const temporadas = await buscarTemporadas();
  renderizarSidebarTemporadas(temporadas);
  listarKpis(temporadas);
  renderizarGraficosVisaoGeral(temporadas);
}

document.addEventListener("DOMContentLoaded", () => {
  atualizarDashboardVisaoGeral();
});
