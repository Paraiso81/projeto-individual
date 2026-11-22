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

document.addEventListener("DOMContentLoaded", () => {
  carregarDadosPerfil();
});
