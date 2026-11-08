let btnCadastrar = document.getElementById("btn-cadastrar");

let iptNome = document.getElementById("iptNome");
let iptEmail = document.getElementById("iptEmail");
let iptSenha = document.getElementById("iptSenha");
let iptConfirmaSenha = document.getElementById("iptConfirmaSenha");

let msgNome = document.getElementById("msgNome");
let msgEmail = document.getElementById("msgEmail");
let msgSenha = document.getElementById("msgSenha");
let msgConfirmaSenha = document.getElementById("msgConfirmaSenha");

async function cadastrar() {
  let nome = iptNome.value;
  let email = iptEmail.value;
  let senha = iptSenha.value;
  let confirmaSenha = iptConfirmaSenha.value;

  msgNome.style.display = "none";
  msgEmail.style.display = "none";
  msgSenha.style.display = "none";
  msgConfirmaSenha.style.display = "none";

  let nomeValidado = await validacaoNome(nome);
  if (nomeValidado.status === false) {
    msgNome.style.display = "block";
    msgNome.innerText = nomeValidado.msg;
  }

  let emailValidado = await validacaoEmail(email);

  if (emailValidado.status === false) {
    msgEmail.style.display = "block";
    msgEmail.innerText = emailValidado.msg;
  }

  let senhaValidada = await validacaoSenha(senha);

  if (senhaValidada.status == false) {
    msgSenha.style.display = "block";
    msgSenha.innerText = senhaValidada.msg;
  }

  let confirmarSenhaValidada = await compararSenha(senha, confirmaSenha);

  if (confirmarSenhaValidada.status == false) {
    msgConfirmaSenha.style.display = "block";
    msgConfirmaSenha.innerText = confirmarSenhaValidada.msg;
  }

  if (
    nomeValidado.status == false ||
    emailValidado.status == false ||
    senhaValidada.status == false ||
    confirmarSenhaValidada.status == false
  ) {
    setTimeout(() => {
      console.log()
      msgNome.style.display = "none";
      msgEmail.style.display = "none";
      msgSenha.style.display = "none";
      msgConfirmaSenha.style.display = "none";
    }, 3000);
    return;
  }

  await fetch("/usuarios/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: nome,
      email: email,
      senha: senha,
    }),
  })
    .then(function (response) {
      console.log(response);
      if (response.ok) {
        console.log("Criamos a conta pae.");
        notificao("sucesso", "Conta criada com sucesso.");
        setTimeout(() => {
          window.location.href = "login.html";
        }, 3000);
      }
    })
    .catch(function (erro) {
      console.log(erro);
      notificao("alerta", "Erro ao criar a conta.");
    });
}
