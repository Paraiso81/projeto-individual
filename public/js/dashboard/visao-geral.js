const graficoBarras = document.getElementById("grafico-barras");
const graficoLinha = document.getElementById("grafico-linha");
const userName = document.getElementById("userName");
const fotoPerfil = document.getElementById("fotoPerfil");

const sessionNome = sessionStorage.getItem("NOME");

const nomeSobreNome = sessionNome.split(" ");
const primeiroNome = nomeSobreNome[0];
const ultimoNome =
  nomeSobreNome[nomeSobreNome.length - 1] !== undefined
    ? nomeSobreNome[nomeSobreNome.length - 1]
    : "";

userName.innerText = `${primeiroNome} ${ultimoNome}`;
fotoPerfil.innerText = primeiroNome.charAt(0) + ultimoNome.charAt(0);

window.logout = async () => {
  let msgLogout = "Saindo da conta.";
  await notificao("sucesso", msgLogout);

  sessionStorage.removeItem("ID_USUARIO");
  sessionStorage.removeItem("NOME");
  sessionStorage.removeItem("EMAIL");

  setTimeout(() => {
    window.location.href = "index.html";
  }, 3000);
};

new Chart(graficoBarras, {
  type: "bar",
  data: {
    labels: [
      "Temporada 2023",
      "Temporada 2024",
      "Temporada 2025",
      "Temporada 2026",
    ],
    datasets: [
      {
        label: "Gols",
        data: [3, 5, 9, 7],
        borderWidth: 1,
        backgroundColor: "#04724D",
        borderRadius: 6,
        barThickness: 42,
      },
      {
        label: "Assistências",
        data: [5, 7, 10, 9],
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
