var temporadaModel = require("../models/temporadaModel");
var usuarioModel = require("../models/usuarioModel");

async function createTemporada(req, res) {
  const { usuarioId, nome, ano } = req.body;

  if (usuarioId == undefined || nome == undefined || ano == undefined)
    return res.status(400).send("Valores undefined.");

  const usuarioExiste = await usuarioModel.consultarUsuario(usuarioId);

  if (usuarioExiste.length <= 0)
    return res.status(404).send("O usuário não existe.");

  if (nome.length < 8)
    return res.status(400).send("Nome de temporada muito curto.");

  const temporadaExiste = await temporadaModel.consultarTemporada(
    undefined,
    undefined,
    ano,
  );

  if (temporadaExiste.length > 0)
    return res.status(403).send("Uma temporada já existe com esse ano");

  //   definir melhor regras de negócios para o ano da temporada.
  //   if(ano !== Number) return res.status(400).send("O ano deve ser um ano válido.")

  temporadaModel
    .createTemporada(nome, ano, usuarioId)
    .then(function () {
      res.status(201).json("Temporada criada com sucesso.");
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).send("Erro ao criar temporada.");
    });
}

async function todasTemporadaUsuario(req, res) {
  const usuarioId = req.params.usuarioId;

  const usuarioExiste = await usuarioModel.consultarUsuario(usuarioId);

  if (usuarioExiste.length <= 0)
    return res.status(404).send("Usuário não encontrado.");

  temporadaModel
    .consultarTemporadasUsuario(usuarioId)
    .then(function (response) {
      if (response.length > 0) {
        res.status(200).json(response);
      } else {
        res.status(400).send("Erro ao buscar temporadas");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).send("Erro no servidor, tente novamente mais tarde.");
    });
}

async function buscarTemporada(req, res) {
  const { usuarioId, temporadaId } = req.params;

  const usuarioExiste = await usuarioModel.consultarUsuario(usuarioId);

  if (usuarioExiste.length <= 0)
    return res.status(404).send("Usuário não encontrado.");

  temporadaModel
    .buscarTemporada(temporadaId, usuarioId)
    .then(function (response) {
      if (response.length > 0) {
        res.status(200).json(response);
      } else {
        res.status(404).send("Temporada não encontrada.");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).send("Erro no servidor, tente novamente mais tarde.");
    });
}

async function atualizarTemporada(req, res) {
  const { usuarioId, temporadaId } = req.params;
  const { nome, ano } = req.body;

  const temporadaExiste = await temporadaModel.buscarTemporada(
    temporadaId,
    usuarioId,
  );

  if (temporadaExiste.length <= 0)
    return res.status(404).send("Temporada não encontrada.");

  temporadaModel
    .atualizarTemporada(usuarioId, temporadaId, nome, ano)
    .then(function (response) {
      res.status(200).json(response);
    })
    .catch(function (erro) {
      console.log(erro);
      res
        .status(500)
        .send("Erro da parte do servidor, tente novamente mais tarde.");
    });
}

async function deletarTemporada(req, res) {
  const { usuarioId, temporadaId } = req.params;

  const usuarioExiste = await usuarioModel.consultarUsuario(usuarioId);

  if (usuarioExiste.length <= 0)
    return res.status(404).send("Usuário não encontrado.");

  const temporadaExiste = await temporadaModel.buscarTemporada(
    temporadaId,
    usuarioId,
  );

  if (temporadaExiste.length <= 0)
    return res.status(404).send("Não foi possível deletar a temporada.");

  temporadaModel
    .deletarTemporada(temporadaId, usuarioId)
    .then(function () {
      res.status(200).send("Temporada deletada com sucesso.");
    })
    .catch(function (erro) {
      console.log(erro);
      res
        .status(500)
        .send("Erro da parte do servidor, tente novamente mais tarde.");
    });
}

module.exports = {
  createTemporada,
  todasTemporadaUsuario,
  buscarTemporada,
  atualizarTemporada,
  deletarTemporada,
};
