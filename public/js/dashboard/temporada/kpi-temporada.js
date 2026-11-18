const kpiPartidasTemporada = document.getElementById("kpiPartidasTemporada");
const apoioUltimaPartida = document.getElementById("apoioUltimaPartida");

const kpiGolsTemporada = document.getElementById("kpiGolsTemporada");
const apoioRecordeGols = document.getElementById("apoioRecordeGols");

const kpiAssistenciasTemporada = document.getElementById(
  "kpiAssistenciasTemporada",
);
const apoioMediaAssistencias = document.getElementById(
  "apoioMediaAssistencias",
);

const kpiMediaGolsTemporada = document.getElementById("kpiMediaGolsTemporada");
const apoioParticipacoes = document.getElementById("apoioParticipacoes");

async function exibirKpisTemporada() {
  const dadosTemporada = await buscarTemporada();

  let temporada = dadosTemporada[0];

  let totalPartidas = 0;
  let dataUltimaPartida = "";
  let totalGols = 0;
  let melhorPartida = null;
  let totalAssistencias = 0;

  if (temporada && temporada.partidas.length > 0) {
    dataUltimaPartida = temporada.partidas[0].dt_partida;
    melhorPartida = temporada.partidas[0];
  }

  for (let i = 0; i < temporada.partidas.length; i++) {
    let partida = temporada.partidas[i];
    if (dataUltimaPartida < partida.dt_partida) {
      dataUltimaPartida = partida.dt_partida;
    }

    if (melhorPartida.gols < partida.gols) {
      melhorPartida = partida;
    }
    totalGols += partida.gols;
    totalAssistencias += partida.assistencias;
    totalPartidas++;
  }

  const mediaAssistencias =
    totalPartidas > 0 ? (totalAssistencias / totalPartidas).toFixed(2) : "0,00";

  const mediaGols =
    totalPartidas > 0 ? (totalGols / totalPartidas).toFixed(2) : "0,00";

  const somaParticipacoes = totalGols + totalAssistencias;

  kpiPartidasTemporada.innerText = totalPartidas;
  apoioUltimaPartida.innerText = dataUltimaPartida
    ? `Última partida em: ${formatarData("default", dataUltimaPartida)}`
    : "Nenhuma partida registrada";
  kpiGolsTemporada.innerText = totalGols;
  apoioRecordeGols.innerText =
    melhorPartida && melhorPartida.gols > 0
      ? `Recorde: ${melhorPartida.gols} gols vs ${melhorPartida.adversario}`
      : "Nenhum gol registrado";
  kpiAssistenciasTemporada.innerText = totalAssistencias;
  apoioMediaAssistencias.innerText = `Média de ${mediaAssistencias} assist. / partida`;
  kpiMediaGolsTemporada.innerText = mediaGols;
  apoioParticipacoes.innerText =
    somaParticipacoes > 0
      ? `${somaParticipacoes} participações diretas (G+A)`
      : "Sem participações em gols";
}

document.addEventListener("DOMContentLoaded", () => {
  exibirKpisTemporada();
});
