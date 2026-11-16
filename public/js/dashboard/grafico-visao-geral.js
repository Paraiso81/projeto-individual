const graficoBarras = document.getElementById("grafico-barras");
const graficoLinha = document.getElementById("grafico-linha");
const dadosTemporadas = JSON.parse(sessionStorage.getItem("TODAS_TEMPORADAS"));
const listaNomesTemp = [];
const listaGols = [];
const listaAssistencias = [];

function listarDadosGrafico() {
  for (let i = 0; i < dadosTemporadas.length; i++) {
    let temporada = dadosTemporadas[i];
    listaNomesTemp.push(temporada.nome);

    let somaGols = 0;
    let somaAssistencias = 0;

    for (let j = 0; j < temporada.partidas.length; j++) {
      let partida = temporada.partidas[j];
      somaGols += partida.gols;
      somaAssistencias += partida.assistencias;
    }

    listaGols.push(somaGols);
    listaAssistencias.push(somaAssistencias);
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
    labels: [
      "Temporada 2023",
      "Temporada 2024",
      "Temporada 2025",
      "Temporada 2026",
    ],
    datasets: [
      {
        label: "Gols / jogo",
        data: [0.18, 0.24, 0.31, 0.35],
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
