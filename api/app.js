
require("node:process").loadEnvFile();

var banco = require("./src/database/config");
var express = require("express");
var estilosRouter = require("./src/routes/estilos");

var app = express();
app.use("/estilos", estilosRouter);
app.get("/teste", function (req, res) {
    res.send("Minha API está funcionando!");
});

app.get("/teste-banco", function (req, res) {

    banco.executar("SELECT 1 AS resultado")
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            res.status(500).json(erro);
        });

});

app.get("/estilos", function (req, res) {

    banco.executar("SELECT * FROM estilo")
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            res.status(500).json(erro);
        });

});

app.listen(3000, function () {
    console.log("API do Lumière rodando na porta 3000");
});
