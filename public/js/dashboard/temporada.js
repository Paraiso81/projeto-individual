const graficoPartidas = document.getElementById("grafico-partidas");

new Chart(graficoPartidas, {
  type: "bar",
  data: {
    labels: ["07/09", "14/09", "21/09", "29/09", "08/10", "15/10"],
    datasets: [
      {
        label: "Gols",
        data: [0, 1, 2, 0, 1, 3],
        borderWidth: 1,
        backgroundColor: "#04724D",
        borderRadius: 4,
        barThickness: 18,
      },
      {
        label: "Assistências",
        data: [3, 0, 2, 1, 2, 1],
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
