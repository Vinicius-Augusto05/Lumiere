
var express = require("express");
var router = express.Router();

var estiloController = require("../controllers/estiloController");

router.get("/", function (req, res) {
    estiloController.listar(req, res);
});

router.get("/perguntas", function (req, res) {
    estiloController.listarPerguntas(req, res);
});

module.exports = router;
