async function validacaoEmail(email) {
  if (email == "") {
    return { status: false, msg: "O campo de email deve ser preenchido." };
  }

  if (!email.includes("@")) {
    return { status: false, msg: "O email deve conter @" };
  }

  return { status: true, msg: "Ok." };
}
