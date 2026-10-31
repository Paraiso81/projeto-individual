var usuarioModel = require("../models/usuarioModel.js");

async function cadastrar(req, res) {
  const data = req.body;

  let nome = data.nome;
  let email = data.email;
  let senha = data.senha;

  if (nome == undefined || email == undefined || senha == undefined) {
    return res
      .status(400)
      .send("Dados undefined, revise os dados preenchidos!");
  }

  if (nome.length < 3) return res.status(400).send("Nome muito curto.");

  if (!email.includes("@")) return res.status(400).send("email inválido.");

  const consultarUsuario = await usuarioModel.consultarUsuario(email);
  console.log(consultarUsuario);
  if (consultarUsuario.length > 0)
    return res.status(400).send("Erro ao criar conta.");

  const ehSenhaValida = senhaValida(senha);

  if (ehSenhaValida === false)
    return res.status(400).send("Senha fraca, cadastre uma senha mais forte.");

  usuarioModel
    .cadastrar(nome, email, senha)
    .then(function () {
      res.status(201).json("Usuário criado com sucesso");
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao realizar o cadastro! Erro: ",
        erro.sqlMessage,
      );
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  cadastrar,
  senhaValida,
};

// funções auxiliares

// função para validar a senha referencia https://blog.dbins.com.br/validar-senhas-com-javascript
function senhaValida(senha) {
  if (senha.length < 8) {
    return false;
  }

  var letrasMaiusculas = /[A-Z]/;
  var letrasMinusculas = /[a-z]/;
  var numeros = /[0-9]/;
  var caracteresEspeciais = /[!@#$%^&*()_+\-=.,;?]/;

  return (
    letrasMaiusculas.test(senha) &&
    letrasMinusculas.test(senha) &&
    numeros.test(senha) &&
    caracteresEspeciais.test(senha)
  );
}
