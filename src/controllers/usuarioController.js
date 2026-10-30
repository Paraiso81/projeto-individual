var usuarioModel = require("../models/usuarioModel.js");

async function cadastrar(req, res) {
  const data = req.body;

  let nome = data.nome;
  let email = data.email;
  let senha = data.senha;

  if (nome == undefined || email == undefined || senha == undefined) {
    res.status(400).send("Dados undefined, revise os dados preenchidos!");
  }

  if (nome.length < 3) res.status(400).send("Nome muito curto.");

  if (!email.includes("@")) res.status(400).send("email inválido.");

  let senhaValida = await senhaValida(senha);

  if (senhaValida === false)
    res.status(400).send("Senha fraca, cadastre uma senha mais forte.");

  usuarioModel
    .cadastrar(nome, email, senha)
    .then(function (resultado) {
      res.status(201).json(resultado);
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
};

// funções auxiliares

// função para validar a senha referencia https://blog.dbins.com.br/validar-senhas-com-javascript
function senhaValida(senha) {
  var retorno = false;
  var letrasMaiusculas = /[A-Z]/;
  var letrasMinusculas = /[a-z]/;
  var numeros = /[0-9]/;
  var caracteresEspeciais = /[!|@|#|$|%|^|&|*|(|)|-|_]/;

  if (senha.length > 8) {
    return retorno;
  }
  if (senha.length < 8) {
    return retorno;
  }
  var auxMaiuscula = 0;
  var auxMinuscula = 0;
  var auxNumero = 0;
  var auxEspecial = 0;

  for (var i = 0; i < senha.length; i++) {
    if (letrasMaiusculas.test(senha[i])) auxMaiuscula++;
    else if (letrasMinusculas.test(senha[i])) auxMinuscula++;
    else if (numeros.test(senha[i])) auxNumero++;
    else if (caracteresEspeciais.test(senha[i])) auxEspecial++;
  }
  if (auxMaiuscula > 0) {
    if (auxMinuscula > 0) {
      if (auxNumero > 0) {
        if (auxEspecial) {
          retorno = true;
        }
      }
    }
  }

  return retorno;
}
