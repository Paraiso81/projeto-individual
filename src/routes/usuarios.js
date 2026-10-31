var express = require("express");
var router = express.Router();

var usuariosController = require("../controllers/usuarioController.js");

router.post("/cadastrar", (req, res) => {
  usuariosController.cadastrar(req, res);
});

module.exports = router;
