const usuarioId = sessionStorage.getItem("ID_USUARIO");
const userName = document.getElementById("userName");
const fotoPerfil = document.getElementById("fotoPerfil");

const sessionNome = sessionStorage.getItem("NOME") || "";
const anoAtual = new Date().getFullYear();

const nomeSobreNome = sessionNome.trim().split(" ");
const primeiroNome = nomeSobreNome[0] || "";
const ultimoNome =
  nomeSobreNome.length > 1 ? nomeSobreNome[nomeSobreNome.length - 1] : "";

if (userName) {
  userName.innerText = `${primeiroNome} ${ultimoNome}`.trim();
}
if (fotoPerfil) {
  fotoPerfil.innerText =
    primeiroNome.charAt(0).toUpperCase() + ultimoNome.charAt(0).toUpperCase();
}

window.logout = async () => {
  let msgLogout = "Saindo da conta.";
  await notificacao("sucesso", msgLogout);

  sessionStorage.removeItem("ID_USUARIO");
  sessionStorage.removeItem("NOME");
  sessionStorage.removeItem("EMAIL");

  setTimeout(() => {
    window.location.href = "../../index.html";
  }, 3000);
};

function renderizarSidebarTemporadas(temporadas) {
  const listaTemporada = document.getElementById("listaTemporada");
  const qtdTemporada = document.getElementById("qtdTemporada");

  if (!listaTemporada || !qtdTemporada) {
    return;
  }

  listaTemporada.innerHTML = "";

  if (temporadas && temporadas.length > 0) {
    qtdTemporada.innerText = `(${temporadas.length})`;
    const limite = 15;

    for (let i = 0; i < temporadas.length; i++) {
      const temporada = temporadas[i];
      const qtdPartidas = temporada.partidas ? temporada.partidas.length : 0;
      const nomeFormatado =
        temporada.nome.length > limite
          ? `${temporada.nome.substring(0, limite)}...`
          : temporada.nome;
      console.log(nomeFormatado, "nome formatado");
      if (Number(temporada.ano) === anoAtual) {
        listaTemporada.innerHTML += `
        <a href="./dashboard-temporada.html?id=${temporada.id}" id="temporada${temporada.id}" class="linha-temporada">
          <span class="dot dot-verde"></span>
          <p class="text-nome-temporada" title="${temporada.nome}">${nomeFormatado}</p>
          <span class="badge-ativa">Atual</span>
        </a>
        `;
      } else {
        listaTemporada.innerHTML += `
        <a href="./dashboard-temporada.html?id=${temporada.id}" id="temporada${temporada.id}" class="linha-temporada">
          <span class="dot dot-azul"></span>
          <p class="text-nome-temporada">${temporada.nome}</p>
          <span class="text-sidebar">${qtdPartidas} jg</span>
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

async function listarTemporadas() {
  const temporadas = await buscarTodasTemporadas();
  renderizarSidebarTemporadas(temporadas);
}

document.addEventListener("DOMContentLoaded", () => {
  if (!window.atualizarDashboardVisaoGeral) {
    listarTemporadas();
  }
});
