
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

function listarPerguntas(req, res) {

    estiloModel.listarPerguntas()
        .then(function (resultado) {

            var perguntas = [];

            for (var i = 0; i < resultado.length; i++) {

                var pergunta = resultado[i];

                var encontrada = false;

                for (var j = 0; j < perguntas.length; j++) {

                    if (perguntas[j].id_pergunta === pergunta.id_pergunta) {
                        perguntas[j].alternativas.push({
                            id_alternativa: pergunta.id_alternativa,
                            descricao: pergunta.alternativa
                        });

                        encontrada = true;
                    }

                }

                if (!encontrada) {

                    perguntas.push({
                        id_pergunta: pergunta.id_pergunta,
                        enunciado: pergunta.enunciado,
                        ordem: pergunta.ordem,
                        alternativas: [{
                            id_alternativa: pergunta.id_alternativa,
                            descricao: pergunta.alternativa
                        }]
                    });

                }

            }

            res.json(perguntas);

        })
        .catch(function (erro) {
            res.status(500).json(erro);
        });

}

module.exports = {
    listar,
    listarPerguntas
};
