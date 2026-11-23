
var estiloModel = require("../models/estiloModel");

function salvar(req, res) {
    var idUsuario = req.body.id_usuario;
    var respostas = req.body.respostas;

    if (!idUsuario || !Array.isArray(respostas) || respostas.length !== 5) {
        return res.status(400).json({
            mensagem: "Dados inválidos. É necessário enviar as cinco respostas."
        });
    }

    estiloModel.criarTentativa(idUsuario)
        .then(function (resultadoTentativa) {
            var idTentativa = resultadoTentativa.insertId;

            return estiloModel.salvarRespostas(idTentativa, respostas)
                .then(function () {
                    res.status(201).json({
                        mensagem: "Respostas salvas com sucesso!",
                        id_tentativa: idTentativa
                    });
                });
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json({
                mensagem: "Erro ao salvar as respostas."
            });
        });
}

function resultado(req, res) {
    var idTentativa = req.params.idTentativa;

    if (!idTentativa || isNaN(idTentativa)) {
        return res.status(400).json({
            mensagem: "ID da tentativa inválido."
        });
    }

    estiloModel.buscarResultado(idTentativa)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json({
                mensagem: "Erro ao buscar o resultado."
            });
        });
}

function recomendacoes(req, res) {
    var idTentativa = req.params.idTentativa;

    if (!idTentativa || isNaN(idTentativa)) {
        return res.status(400).json({
            mensagem: "ID da tentativa inválido."
        });
    }

    estiloModel.buscarResultado(idTentativa)
        .then(function (resultado) {
            var estilosPrincipais = resultado.slice(0, 2);

            var idsEstilos = [
                estilosPrincipais[0].id_estilo,
                estilosPrincipais[1].id_estilo
            ];

            console.log("IDs dos estilos:", idsEstilos);

            return estiloModel.buscarJogosPorEstilos(idsEstilos)
                .then(function (jogos) {
                    console.log("Jogos encontrados:", jogos);

                    res.status(200).json({
                        estilos: estilosPrincipais,
                        jogos: jogos
                    });
                });
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json({
                mensagem: "Erro ao buscar as recomendações."
            });
        });
}

module.exports = {
    salvar,
    resultado,
    recomendacoes
};
