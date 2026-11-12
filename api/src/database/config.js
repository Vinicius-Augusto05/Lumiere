
var mysql = require("mysql2");

var conexao = mysql.createPool({
    host: "127.0.0.1",
    user: "aluno",
    password: process.env.DB_PASSWORD,
    database: "lumiere",
    port: 3306
});


function executar(instrucao, valores = []) {
    return new Promise(function (resolve, reject) {

        conexao.query(instrucao, valores, function (erro, resultados) {

            if (erro) {
                reject(erro);
            } else {
                resolve(resultados);
            }

        });
    });
}

module.exports = {
    executar
};
