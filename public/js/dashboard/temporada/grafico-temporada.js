const containerGraficoPartidas = document.querySelector(
  ".card-grafico-partidas .container-canvas",
);
const legendaGraficoPartidas = document.querySelector(
  ".card-grafico-partidas .legenda-grafico",
);

let chartPartidas = null;

function criarEstadoVazioGraficoPartidas() {
  return `
    <div class="estado-vazio">
      <div class="icone-estado-vazio">
        <i class="fa-solid fa-info"></i>
      </div>
      <h2 class="titulo-estado-vazio">Sem dados</h2>
      <p class="descricao-estado-vazio">
        nenhum dado para ser exibido no gráfico
      </p>
    </div>
  `;
}

async function exibirDadosGrafico() {
  const dadosTemporada = await buscarTemporada();
  const temporada = dadosTemporada[0];
  const partidas = temporada && temporada.partidas ? temporada.partidas : [];

  const dataPartidas = [];
  const golsPartidas = [];
  const assistenciasPartidas = [];

  let totalGols = 0;
  let totalAssistencias = 0;

  const inicio = partidas.length > 6 ? partidas.length - 6 : 0;

  for (let i = inicio; i < partidas.length; i++) {
    const partida = partidas[i];
    const gols = Number(partida.gols) || 0;
    const assistencias = Number(partida.assistencias) || 0;

    dataPartidas.push(formatarData("short", partida.dt_partida));
    golsPartidas.push(gols);
    assistenciasPartidas.push(assistencias);

    totalGols += gols;
    totalAssistencias += assistencias;
  }

  if (chartPartidas) {
    chartPartidas.destroy();
    chartPartidas = null;
  }

  const temDados =
    dataPartidas.length > 0 && (totalGols > 0 || totalAssistencias > 0);

  if (!temDados) {
    if (legendaGraficoPartidas) {
      legendaGraficoPartidas.style.display = "none";
    }
    if (containerGraficoPartidas) {
      containerGraficoPartidas.innerHTML = criarEstadoVazioGraficoPartidas();
    }
    return;
  }

  if (legendaGraficoPartidas) {
    legendaGraficoPartidas.style.display = "";
  }

  let canvas = document.getElementById("grafico-partidas");
  if (!canvas && containerGraficoPartidas) {
    containerGraficoPartidas.innerHTML = `<canvas id="grafico-partidas"></canvas>`;
    canvas = document.getElementById("grafico-partidas");
  }

  chartPartidas = new Chart(canvas, {
    type: "bar",
    data: {
      labels: dataPartidas,
      datasets: [
        {
          label: "Gols",
          data: golsPartidas,
          borderWidth: 1,
          backgroundColor: "#04724D",
          borderRadius: 4,
          barThickness: 18,
        },
        {
          label: "Assistências",
          data: assistenciasPartidas,
          borderWidth: 1,
          backgroundColor: "#1768AC",
          borderRadius: 4,
          barThickness: 18,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
}

document.addEventListener("DOMContentLoaded", () => {
  exibirDadosGrafico();
});
