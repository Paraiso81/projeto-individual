var express = require("express");
var router = express.Router();

var partidasController = require("../controllers/partidaController.js");

router.post("/", function (req, res) {
  partidasController.cadastrarPartida(req, res);
});

module.exports = router;
