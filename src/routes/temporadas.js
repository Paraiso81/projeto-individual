var express = require("express");
var router = express.Router();

var temporadaController = require("../controllers/temporadaController");

router.post("/", function (req, res) {
  temporadaController.createTemporada(req, res);
});

router.get("/usuario/:usuarioId", function (req, res) {
  temporadaController.todasTemporadaUsuario(req, res);
});

router.get("/:usuarioId/:temporadaId", function (req, res) {
  temporadaController.buscarTemporada(req, res);
});

router.patch("/:usuarioId/:temporadaId", function (req, res) {
  temporadaController.atualizarTemporada(req, res);
});

router.delete("/:usuarioId/:temporadaId", function (req, res) {
  temporadaController.deletarTemporada(req, res);
});

module.exports = router;
