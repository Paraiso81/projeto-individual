var express = require("express");
var router = express.Router();

var partidasController = require("../controllers/partidaController.js");

router.post("/partidas", function (req, res) {
  partidasController.cadastrar(req, res);
});


module.exports = router;