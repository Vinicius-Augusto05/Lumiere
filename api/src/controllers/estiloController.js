
var estiloModel = require("../models/estiloModel");

function listar(req, res) {

    estiloModel.listar()
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            res.status(500).json(erro);
        });

}

module.exports = {
    listar
};
