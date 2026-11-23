let iptEmail = document.getElementById("iptEmail");
let iptSenha = document.getElementById("iptSenha");
let erroEmail = document.getElementById("msgEmail");
let erroSenha = document.getElementById("msgSenha");
let erroLogin = document.getElementById("msgLogin");

async function login() {
  let email = iptEmail.value;
  let senha = iptSenha.value;

  erroLogin.innerText = "Email ou senha inválido";
  erroLogin.style.display = "none";
  erroEmail.innerText = "";
  erroEmail.style.display = "none";
  erroSenha.innerText = "";
  erroSenha.style.display = "none";

  if (email == "") {
    erroEmail.style.display = "block";
    erroEmail.innerText = "Por favor, preencha o campo de email.";
    return;
  }

  if (!email.includes("@")) {
    erroEmail.style.display = "block";
    erroEmail.innerText = "Email inválido";
    return;
  }

  if (senha == "" || email == "") {
    erroSenha.style.display = "block";
    erroSenha.innerText = "Por favor, preencha o campo de senha.";
    return;
  }

  const usuario = await loginUsuario(email, senha);

  if (usuario) {
    setTimeout(() => {
      window.location = "../../pages/dashboard-visao-geral.html";
    }, 3000);
  } else {
    erroLogin.style.display = "block";
    erroLogin.innerText = "Email ou senha inválido";
    setTimeout(() => {
      erroLogin.style.display = "none";
    }, 5000);
  }
}
