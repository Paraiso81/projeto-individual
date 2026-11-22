const iptNome = document.getElementById("iptNome");
const iptEmail = document.getElementById("iptEmail");
const msgNome = document.getElementById("msgNome");

function carregarDadosPerfil() {
  const nome = sessionStorage.getItem("NOME") || "";
  const email = sessionStorage.getItem("EMAIL") || "";

  if (iptNome) {
    iptNome.value = nome;
  }

  if (iptEmail) {
    iptEmail.value = email;
  }
}

async function salvarAlteracoesPerfil() {
  const nome = iptNome.value.trim();

  msgNome.style.display = "none";
  msgNome.innerText = "";

  const nomeValidado = await validacaoNome(nome);
  if (nomeValidado.status === false) {
    msgNome.style.display = "block";
    msgNome.innerText = nomeValidado.msg;
    setTimeout(() => {
      msgNome.style.display = "none";
    }, 3000);
    return;
  }

  const nomeAtual = (sessionStorage.getItem("NOME") || "").trim();
  if (nome === nomeAtual) {
    await notificacao("alerta", "Nenhuma alteração foi feita no nome.");
    return;
  }

  const usuarioAtualizado = await atualizarUsuario({ nome: nome });

  if (usuarioAtualizado) {
    iptNome.value = usuarioAtualizado.nome;
    if (window.atualizarUsuarioSidebar) {
      window.atualizarUsuarioSidebar();
    }
  }
}

async function confirmarExclusaoConta() {
  const btnConfirmar = document.getElementById("btnConfirmarExcluirConta");
  if (btnConfirmar) {
    btnConfirmar.disabled = true;
  }

  const excluido = await deletarUsuario();

  if (excluido) {
    closeModal("overlayDeletarConta");
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 3000);
  } else if (btnConfirmar) {
    btnConfirmar.disabled = false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  carregarDadosPerfil();
});
