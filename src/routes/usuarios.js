var express = require("express");
var router = express.Router();

var usuariosController = require("../controllers/usuarioController.js");

router.post("/cadastrar", function (req, res) {
  usuariosController.cadastrar(req, res);
});

router.post("/login", function (req, res) {
  usuariosController.login(req, res);
});

router.patch("/:usuarioId", function (req, res) {
  usuariosController.atualizarUsuario(req, res);
});

router.delete("/:usuarioId", function (req, res) {
  usuariosController.deletarUsuario(req, res);
});

module.exports = router;
