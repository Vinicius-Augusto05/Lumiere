
var banco = require("../database/config");

function listar() {
    var instrucaoSql = `
        SELECT * FROM estilo;
    `;

    return banco.executar(instrucaoSql);
}

function listarPerguntas() {
    var instrucaoSql = `
        SELECT
            p.id_pergunta,
            p.enunciado,
            p.ordem,
            a.id_alternativa,
            a.descricao AS alternativa
        FROM pergunta p
        JOIN alternativa a
            ON p.id_pergunta = a.fk_pergunta
        ORDER BY p.ordem, a.id_alternativa;
    `;

    return banco.executar(instrucaoSql);
}

function criarTentativa(idUsuario) {
    var instrucaoSql = `
        INSERT INTO tentativa (fk_usuario, data_realizacao)
        VALUES (?, NOW());
    `;

    return banco.executar(instrucaoSql, [idUsuario]);
}

function salvarRespostas(idTentativa, respostas) {
    var valores = [];
    var partes = [];

    for (var i = 0; i < respostas.length; i++) {
        partes.push("(?, ?)");
        valores.push(idTentativa, respostas[i]);
    }

    var instrucaoSql = `
        INSERT INTO resposta (fk_tentativa, fk_alternativa)
        VALUES ${partes.join(", ")};
    `;

    return banco.executar(instrucaoSql, valores);
}

function buscarResultado(idTentativa) {
    var instrucaoSql = `
        SELECT
            e.id_estilo,
            e.nome,
            e.descricao,
            COUNT(r.id_resposta) AS pontos
        FROM estilo e
        LEFT JOIN alternativa a
            ON e.id_estilo = a.fk_estilo
        LEFT JOIN resposta r
            ON a.id_alternativa = r.fk_alternativa
            AND r.fk_tentativa = ?
        GROUP BY
            e.id_estilo,
            e.nome,
            e.descricao
        ORDER BY pontos DESC, e.id_estilo ASC;
    `;

    return banco.executar(instrucaoSql, [idTentativa]);
}

function buscarJogosPorEstilos(idsEstilos) {
    var instrucaoSql = `
        SELECT
            j.id_jogo,
            j.nome,
            j.descricao,
            e.id_estilo,
            e.nome AS estilo
        FROM jogo j
        JOIN estilo e
            ON j.fk_estilo = e.id_estilo
        WHERE j.fk_estilo IN (?, ?)
        ORDER BY FIELD(j.fk_estilo, ?, ?), j.id_jogo;
    `;

    return banco.executar(instrucaoSql, [
        idsEstilos[0],
        idsEstilos[1],
        idsEstilos[0],
        idsEstilos[1]
    ]);
}

module.exports = {
    listar,
    listarPerguntas,
    criarTentativa,
    salvarRespostas,
    buscarResultado,
    buscarJogosPorEstilos
};
