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
  await notificacao("sucesso", msgLogout);

  sessionStorage.removeItem("ID_USUARIO");
  sessionStorage.removeItem("NOME");
  sessionStorage.removeItem("EMAIL");
  sessionStorage.removeItem("TODAS_TEMPORADAS");

  setTimeout(() => {
    window.location.href = "../../index.html";
  }, 3000);
};

async function listarTemporadas() {
  const listaTemporada = document.getElementById("listaTemporada");
  const qtdTemporada = document.getElementById("qtdTemporada");
  listaTemporada.innerHTML = "";

  await buscarTemporadas();

  const temporadas = JSON.parse(sessionStorage.getItem("TODAS_TEMPORADAS"));

  if (temporadas !== null && temporadas.length > 0) {
    qtdTemporada.innerText = `(${temporadas.length})`;

    for (let i = 0; i < temporadas.length; i++) {
      if (Number(temporadas[i].ano) === anoAtual) {
        listaTemporada.innerHTML += `
        <a href="./dashboard-temporada.html?id=${temporadas[i].id}" id="temporada${temporadas[i].id}" class="linha-temporada">
          <span class="dot dot-verde"></span>
          <p class="text-nome-temporada">${temporadas[i].nome}</p>
          <span class="badge-ativa">Atual</span>
        </a>
        `;
      } else {
        listaTemporada.innerHTML += `
        <a href="./dashboard-temporada.html?id=${temporadas[i].id}" id="temporada${temporadas[i].id}" class="linha-temporada">
          <span class="dot dot-azul"></span>
          <p class="text-nome-temporada">${temporadas[i].nome}</p>
          <span class="text-sidebar">${temporadas[i].partidas.length} jg</span>
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

document.addEventListener("DOMContentLoaded", () => {
  listarTemporadas();
});
