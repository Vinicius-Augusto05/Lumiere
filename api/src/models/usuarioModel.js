
var banco = require("../database/config");

function cadastrar(nome, email, senhaHash) {
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha_hash, data_cadastro)
        VALUES (?, ?, ?, NOW());
    `;

    return banco.executar(instrucaoSql, [nome, email, senhaHash]);
}

function buscarPorEmail(email) {
    var instrucaoSql = `
        SELECT * FROM usuario
        WHERE email = ?;
    `;

    return banco.executar(instrucaoSql, [email]);
}

module.exports = {
    cadastrar,
    buscarPorEmail
};
