var partidaModel = require("../models/partidasModel");
var temporadaModel = require("../models/temporadaModel");

async function cadastrarPartida(req, res) {
  const { dt_partida, adversario, gols, assistencias, temporadaId, usuarioId } =
    req.body;
  // validar a data futuramente
  if (adversario.trim().length <= 3)
    return res
      .status(400)
      .send("O nome do adversario precisa ter pelo menos 4 caracteres.");

  if (Number(gols) < 0)
    return res.status(400).send("Os gols não podem ser negativos.");

  if (Number(assistencias) < 0)
    return res.status(400).send("As assistências não podem ser negativos.");

  const temporadaExiste = await temporadaModel.buscarTemporada(
    temporadaId,
    usuarioId,
  );

  if (temporadaExiste.length == 0)
    return res.status(400).send("Temporada ou usuário inválido.");

  partidaModel
    .createPartida(dt_partida, adversario, temporadaId, gols, assistencias)
    .then(function () {
      res.status(201).send("Partida criada com sucesso!");
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).send("Ocorreu um erro da parte do servidor.");
    });
}

async function buscarPartida(req, res) {
  const { usuarioId, temporadaId, partidaId } = req.params;

  const temporadaExiste = await temporadaModel.buscarTemporada(
    temporadaId,
    usuarioId,
  );

  if (temporadaExiste.length <= 0)
    return res.status(404).send("Temporada ou usuário inválido.");

  partidaModel
    .buscarPartida(temporadaId, usuarioId, partidaId)
    .then(function (response) {
      if (response.length > 0) {
        res.status(200).json(response);
      } else {
        res.status(404).send("Partida não encontrada.");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      res
        .status(500)
        .send("Erro da parte do servidor, tente novamente mais tarde.");
    });
}

async function atualizarPartida(req, res) {
  const { usuarioId, temporadaId, partidaId } = req.params;
  const { dt_partida, adversario, gols, assistencias } = req.body;

  if (adversario !== undefined && adversario.trim().length <= 3)
    return res
      .status(400)
      .send("O nome do adversario precisa ter pelo menos 4 caracteres.");

  if (gols !== undefined && Number(gols) < 0)
    return res.status(400).send("Os gols não podem ser negativos.");

  if (assistencias !== undefined && Number(assistencias) < 0)
    return res.status(400).send("As assistências não podem ser negativos.");

  const partidaExiste = await partidaModel.buscarPartida(
    temporadaId,
    usuarioId,
    partidaId,
  );

  if (partidaExiste.length <= 0)
    return res.status(404).send("Partida não encontrada.");

  partidaModel
    .atualizarPartida(
      usuarioId,
      temporadaId,
      partidaId,
      dt_partida,
      adversario,
      gols,
      assistencias,
    )
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

async function deletarPartida(req, res) {
  const { usuarioId, temporadaId, partidaId } = req.params;

  const partidaExiste = await partidaModel.buscarPartida(
    temporadaId,
    usuarioId,
    partidaId,
  );

  if (partidaExiste.length <= 0)
    return res.status(404).send("Partida não encontrada.");

  partidaModel
    .deletarPartida(temporadaId, partidaId)
    .then(function () {
      res.status(200).send("Partida deletada com sucesso.");
    })
    .catch(function (erro) {
      console.log(erro);
      res
        .status(500)
        .send("Erro da parte do servidor, tente novamente mais tarde.");
    });
}

module.exports = {
  cadastrarPartida,
  buscarPartida,
  atualizarPartida,
  deletarPartida,
};
