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

  await fetch("/usuarios/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      senha: senha,
    }),
  }).then(function (response) {
    console.log("Fiz o fetch");
    if (response.ok) {
      console.log(response);

      response.json().then((json) => {
        console.log(JSON.stringify(json));
        sessionStorage.ID_USUARIO = json.id;
        sessionStorage.NOME = json.nome;
        sessionStorage.EMAIL = json.email;
      });

      window.location = "../../pages/dashboard-teste.html";
    } else {
      console.log("Houve um erro ao tentar realizar o login!");
      erroLogin.style.display = "block";
      erroLogin.innerText = "Email ou senha inválido";

      setTimeout(() => {
        erroLogin.style.display = "none";
      }, 5000);
      response.text().then((texto) => {
        console.error(texto);
      });
    }
  });
}
