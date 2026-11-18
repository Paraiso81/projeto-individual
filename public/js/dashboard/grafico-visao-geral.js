const graficoGolsAssistenciasTemporada = document.getElementById(
  "sectionGraficoGolsAssistenciaTemporada",
);
const graficoMediaGolsTemporada = document.getElementById(
  "sectionGraficoMediaGols",
);

const legendaGraficoGolsAssistencias = document.getElementById(
  "legendaGraficoGolsAssistencias",
);
const legendaGraficoMediaGols = document.getElementById(
  "legendaGraficoMediaGols",
);

let chartBarras = null;
let chartLinha = null;

function criarHtmlEstadoVazio() {
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

function prepararContainerGrafico(container, legenda, temDados, canvasId) {
  if (!container) {
    return null;
  }

  if (!temDados) {
    if (legenda) {
      legenda.style.display = "none";
    }
    container.innerHTML = criarHtmlEstadoVazio();
    return null;
  }

  if (legenda) {
    legenda.style.display = "";
  }

  let canvas = document.getElementById(canvasId);
  if (!canvas) {
    container.innerHTML = `<canvas id="${canvasId}"></canvas>`;
    canvas = document.getElementById(canvasId);
  }

  return canvas;
}

function renderizarGraficosVisaoGeral(temporadas) {
  const listaTemporadas = temporadas || [];
  const listaNomesTemp = [];
  const listaGols = [];
  const listaAssistencias = [];
  const listaMediaGolsTemporada = [];

  let totalGolsGeral = 0;
  let totalAssistenciasGeral = 0;

  for (let i = 0; i < listaTemporadas.length; i++) {
    const temporada = listaTemporadas[i];
    const partidas = temporada.partidas || [];

    listaNomesTemp.push(temporada.nome);

    let golsTemporada = 0;
    let assistenciasTemporada = 0;

    for (let j = 0; j < partidas.length; j++) {
      const partida = partidas[j];
      golsTemporada += Number(partida.gols) || 0;
      assistenciasTemporada += Number(partida.assistencias) || 0;
    }

    totalGolsGeral += golsTemporada;
    totalAssistenciasGeral += assistenciasTemporada;

    const mediaGolsTemporada =
      partidas.length > 0
        ? Number((golsTemporada / partidas.length).toFixed(2))
        : 0;

    listaGols.push(golsTemporada);
    listaAssistencias.push(assistenciasTemporada);
    listaMediaGolsTemporada.push(mediaGolsTemporada);
  }

  if (chartBarras) {
    chartBarras.destroy();
    chartBarras = null;
  }
  if (chartLinha) {
    chartLinha.destroy();
    chartLinha = null;
  }

  const temDadosBarras =
    listaNomesTemp.length > 0 &&
    (totalGolsGeral > 0 || totalAssistenciasGeral > 0);
  const temDadosLinha = listaNomesTemp.length > 0 && totalGolsGeral > 0;

  const canvasBarras = prepararContainerGrafico(
    graficoGolsAssistenciasTemporada,
    legendaGraficoGolsAssistencias,
    temDadosBarras,
    "grafico-barras",
  );

  if (canvasBarras) {
    chartBarras = new Chart(canvasBarras, {
      type: "bar",
      data: {
        labels: listaNomesTemp,
        datasets: [
          {
            label: "Gols",
            data: listaGols,
            borderWidth: 1,
            backgroundColor: "#04724D",
            borderRadius: 6,
            barThickness: 42,
          },
          {
            label: "Assistências",
            data: listaAssistencias,
            borderWidth: 1,
            backgroundColor: "#1768AC",
            borderRadius: 6,
            barThickness: 42,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
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

  const canvasLinha = prepararContainerGrafico(
    graficoMediaGolsTemporada,
    legendaGraficoMediaGols,
    temDadosLinha,
    "grafico-linha",
  );

  if (canvasLinha) {
    chartLinha = new Chart(canvasLinha, {
      type: "line",
      data: {
        labels: listaNomesTemp,
        datasets: [
          {
            label: "Gols / jogo",
            data: listaMediaGolsTemporada,
            borderColor: "#04724D",
            backgroundColor: "#04724D",
            borderWidth: 2.5,
            tension: 0.35,
            pointRadius: 5,
            pointBackgroundColor: "#FFFFFF",
            pointBorderColor: "#04724D",
            pointBorderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
          x: {
            offset: true,
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
}
