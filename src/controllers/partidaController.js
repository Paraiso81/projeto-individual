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

module.exports = {
  cadastrarPartida,
};
