const usuarioId = sessionStorage.getItem("ID_USUARIO");
const userName = document.getElementById("userName");
const fotoPerfil = document.getElementById("fotoPerfil");

const sessionNome = sessionStorage.getItem("NOME");
const anoAtual = new Date().getFullYear();

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
    window.location.href = "../../index.html";
  }, 3000);
};

async function listarTemporadas() {
  const listaTemporada = document.getElementById("listaTemporada");
  const qtdTemporada = document.getElementById("qtdTemporada");

  const data = await fetch(`/temporadas/usuario/${usuarioId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      if (response.ok) {
        console.log(response, "temporadas");
      }
      return response.json();
    })
    .catch(async function (erro) {
      console.log(erro);
      await notificao("alerta", "Houve um problema ao carregar os dados.");
      listaTemporada.innerHTML = ``;
    });

  console.log(data);

  if (data !== undefined) {
    qtdTemporada.innerText = `(${data.length})`;
    for (let i = 0; i < data.length; i++) {
      if (Number(data[i].ano) === anoAtual) {
        listaTemporada.innerHTML += `
        <a href="./dashboard-temporada.html" id="temporada${data[i].id}" class="linha-temporada">
          <span class="dot dot-verde"></span>
          <p class="text-nome-temporada">${data[i].nome}</p>
          <span class="badge-ativa">Atual</span>
        </a>
        `;
      } else {
        listaTemporada.innerHTML += `
        <a href="./dashboard-temporada.html" id="temporada${data[i].id}" class="linha-temporada">
        <span class="dot dot-azul"></span>
        <p class="text-nome-temporada">${data[i].nome}</p>
        <span class="text-sidebar">${data[i].partidas.length} jg</span>
        </a>
        `;
      }
    }
  } else {
    qtdTemporada.innerText = "";
    listaTemporada.innerHTML = `
        <div class="estado-vazio estado-vazio-escuro">
          <div class="icone-estado-vazio">
            <i class="fa-solid fa-info"></i>
          </div>
        <p class="titulo-estado-vazio">Nenhuma temporada cadastrada</p>
      <span class="descricao-estado-vazio">
        Crie sua primeira temporada para começar.
      </span>
    </div>
      `;
  }
}

const graficoBarras = document.getElementById("grafico-barras");
const graficoLinha = document.getElementById("grafico-linha");

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

document.addEventListener("DOMContentLoaded", () => {
  listarTemporadas();
});
