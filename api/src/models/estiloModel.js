
var banco = require("../database/config");

function listar() {

    var instrucaoSql = `
        SELECT * FROM estilo;
    `;

    return banco.executar(instrucaoSql);
}

module.exports = {
    listar
};
