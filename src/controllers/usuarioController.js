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

async function login(req, res) {
  const data = req.body;

  const email = data.email;
  const senha = data.senha;

  if (email == undefined || senha == undefined)
    return res
      .status(400)
      .send("Dados undefined, revise os dados preenchidos!");

  if (!email.includes("@")) return res.status(400).send("email inválido.");

  await usuarioModel.login(email, senha).then(function (response) {
    if (response.length > 0) {
      const data = response[0];
      let usuarioId = data.id;
      let nome = data.nome;
      let email = data.email;
      return res.status(200).json({ id: usuarioId, nome, email });
    } else {
      return res.status(403).send("Email ou senha inválido.");
    }
  });
}

async function atualizarUsuario(req, res) {
  const data = req.body;
  const usuarioId = req.params.usuarioId;
  const nome = data.nome;
  const email = data.email;
  // adicionar uma verificação se o usuário existe antes de fazer o update;
  const usuarioExiste = await usuarioModel.consultarUsuario(usuarioId);
  console.log(usuarioExiste, "user existe");
  if (usuarioExiste.length <= 0)
    return res.status(404).send("Erro ao atualizar usuário.");

  if (usuarioId == undefined)
    return res.status(400).send("Erro ao identificar usuário.");

  if (nome.length < 3) return res.status(400).send("Nome muito curto.");

  if (email !== undefined && !email.includes("@"))
    return res.status(400).send("email inválido.");

  usuarioModel
    .atualizarUsuario(usuarioId, { nome, email })
    .then(function (response) {
      if (response.length > 0) {
        const data = response[0];
        console.log("response data", data);
        const usuarioId = data.id;
        const nome = data.nome;
        const email = data.email;

        return res.status(200).json({ id: usuarioId, nome, email });
      }
    });
}

async function deletarUsuario(req, res) {
  const usuarioId = req.params.usuarioId;

  const usuarioExiste = await usuarioModel.consultarUsuario(usuarioId);

  if (usuarioExiste.length <= 0)
    return res.status(404).send("Usuário não encontrado.");

  usuarioModel
    .deletarUsuario(usuarioId)
    .then(function () {
      res.status(200).send("Usuário deletado com sucesso.");
    })
    .catch(function (erro) {
      console.log(erro);
      res
        .status(500)
        .send("Erro da parte do servidor, tente novamente mais tarde.");
    });
}

module.exports = {
  cadastrar,
  login,
  atualizarUsuario,
  deletarUsuario,
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
