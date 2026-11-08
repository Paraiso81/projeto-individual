async function validacaoNome(nome) {
  if (nome == "") {
    return { status: false, msg: "Digite um nome de pelo menos 3 caracteres." };
  }

  if (nome.length < 3) {
    return {
      status: false,
      msg: "O nome deve conter pelo menos 3 caracteres.",
    };
  }

  if (nome.length > 45) {
    return { status: false, msg: "O máximo de caractares permitido é de 45." };
  }

  return { status: true, msg: "Ok" };
}
