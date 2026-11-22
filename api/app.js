
var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");

var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var banco = require("./src/database/config");
var estilosRouter = require("./src/routes/estilos");
var usuariosRouter = require("./src/routes/usuarios");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

app.use("/estilos", estilosRouter);
app.use("/usuarios", usuariosRouter);

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

app.listen(PORTA_APP, function () {
    console.log(`
    Servidor do Lumière rodando!
    Acesse: http://${HOST_APP}:${PORTA_APP}
    Ambiente: ${process.env.AMBIENTE_PROCESSO}
    `);
});
