var express = require("express");
var router = express.Router();

var usuariosController = require("../controllers/usuarioController.js");

router.post("/cadastrar", function (req, res) {
  usuariosController.cadastrar(req, res);
});

router.post("/login", function (req, res) {
  usuariosController.login(req, res);
});

module.exports = router;
