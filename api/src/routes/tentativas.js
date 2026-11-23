
var express = require("express");
var router = express.Router();

var tentativaController = require("../controllers/tentativaController");

router.post("/salvar", function (req, res) {
    tentativaController.salvar(req, res);
});

router.get("/resultado/:idTentativa", function (req, res) {
    tentativaController.resultado(req, res);
});

router.get("/recomendacoes/:idTentativa", function (req, res) {
    tentativaController.recomendacoes(req, res);
});

module.exports = router;
