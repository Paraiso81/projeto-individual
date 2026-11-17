const graficoBarras = document.getElementById("grafico-barras");
const graficoLinha = document.getElementById("grafico-linha");
const dadosTemporadas = JSON.parse(sessionStorage.getItem("TODAS_TEMPORADAS"));

const listaNomesTemp = [];
const listaGols = [];
const listaAssistencias = [];
const listaMediaGolsTemporada = [];

function listarDadosGrafico() {
  let somaGols = 0;
  let somaAssistencias = 0;

  let totalTemporadas = dadosTemporadas.length;
  let totalPartidas = 0;
  let golsTemporada = 0;

  for (let i = 0; i < dadosTemporadas.length; i++) {
    let temporada = dadosTemporadas[i];
    listaNomesTemp.push(temporada.nome);

    golsTemporada = 0;

    for (let j = 0; j < temporada.partidas.length; j++) {
      let partida = temporada.partidas[j];
      somaGols += partida.gols;
      somaAssistencias += partida.assistencias;
      totalPartidas++;
      golsTemporada += partida.gols;
    }
    let calcMediaGolsTemporada = golsTemporada / totalTemporadas;
    listaGols.push(somaGols);
    listaAssistencias.push(somaAssistencias);
    listaMediaGolsTemporada.push(calcMediaGolsTemporada);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  listarDadosGrafico();
});

new Chart(graficoBarras, {
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

new Chart(graficoLinha, {
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

const graficoGolsAssistenciasTemporada = document.getElementById(
  "sectionGraficoGolsAssistenciaTemporada",
);
const graficoMediaGolsTemporada = document.getElementById(
  "sectionGraficoMediaGols",
);

const legendaGrafcoGolsAssistencias = document.getElementById(
  "legendaGraficoGolsAssistencias",
);
const legendaGraficoMediaGols = document.getElementById(
  "legendaGraficoMediaGols",
);

if (
  listaNomesTemp.length == 0 ||
  listaAssistencias.length == 0 ||
  listaGols.length == 0
) {
  legendaGrafcoGolsAssistencias.innerHTML = ``;
  graficoGolsAssistenciasTemporada.innerHTML = `
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

if (listaNomesTemp.length == 0 || listaGols.length == 0) {
  legendaGraficoMediaGols.innerHTML = ``;
  graficoBarras.innerHTML = `
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
