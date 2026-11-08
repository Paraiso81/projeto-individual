// função para validar a senha referencia https://blog.dbins.com.br/validar-senhas-com-javascript
async function validacaoSenha(senha) {
  if (senha.length < 8) {
    return {
      status: false,
      msg: "A senha deve conter pelo menos 8 caracteres.",
    };
  }

  var letrasMaiusculas = /[A-Z]/;
  var letrasMinusculas = /[a-z]/;
  var numeros = /[0-9]/;
  var caracteresEspeciais = /[!@#$%^&*()_+\-=.,;?]/;

  if (letrasMaiusculas.test(senha) == false) {
    return {
      status: false,
      msg: "A senha deve conter pelo menos 1 letra maiúscula.",
    };
  }

  if (letrasMinusculas.test(senha) == false) {
    return {
      status: false,
      msg: "A senha deve conter pelo menos 1 letra minúscula.",
    };
  }

  if (numeros.test(senha) == false) {
    return {
      status: false,
      msg: "A senha deve conter pelo menos 1 número.",
    };
  }

  if (caracteresEspeciais.test(senha) == false) {
    return {
      status: false,
      msg: "A senha deve conter pelo menos 1 caracter especial.",
    };
  }

  return { status: true, msg: "Ok." };
}

async function compararSenha(senha, confirmaSenha) {
  if (confirmaSenha == "") {
    return {
      status: false,
      msg: "O campo confirmar senha precisa ser preenchido",
    };
  }
  if (senha !== confirmaSenha) {
    return { status: false, msg: "As senhas não estão iguais." };
  }

  return { status: true, msg: "Ok." };
}
