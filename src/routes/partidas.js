var express = require("express");
var router = express.Router();

var partidasController = require("../controllers/partidaController.js");

router.post("/", function (req, res) {
  partidasController.cadastrarPartida(req, res);
});

router.get(
  "/:usuarioId/:temporadaId/:partidaId",
  function (req, res) {
    partidasController.buscarPartida(req, res);
  },
);

router.patch(
  "/:usuarioId/:temporadaId/:partidaId",
  function (req, res) {
    partidasController.atualizarPartida(req, res);
  },
);

router.delete(
  "/:usuarioId/:temporadaId/:partidaId",
  function (req, res) {
    partidasController.deletarPartida(req, res);
  },
);

module.exports = router;
