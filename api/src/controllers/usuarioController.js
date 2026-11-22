
var crypto = require("crypto");
var usuarioModel = require("../models/usuarioModel");

function gerarHash(senha) {
    return new Promise(function (resolve, reject) {
        var salt = crypto.randomBytes(16).toString("hex");

        crypto.scrypt(senha, salt, 64, function (erro, resultado) {
            if (erro) {
                reject(erro);
            } else {
                resolve(salt + ":" + resultado.toString("hex"));
            }
        });
    });
}

function compararSenha(senha, senhaHash) {
    return new Promise(function (resolve, reject) {
        var partes = senhaHash.split(":");

        if (partes.length !== 2) {
            resolve(false);
            return;
        }

        var salt = partes[0];
        var hashArmazenado = Buffer.from(partes[1], "hex");

        crypto.scrypt(senha, salt, 64, function (erro, resultado) {
            if (erro) {
                reject(erro);
            } else {
                resolve(crypto.timingSafeEqual(resultado, hashArmazenado));
            }
        });
    });
}

function cadastrar(req, res) {
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;

    if (!nome || !email || !senha) {
        return res.status(400).json({
            mensagem: "Preencha todos os campos."
        });
    }

    nome = nome.trim();
    email = email.trim().toLowerCase();

    if (!nome || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({
            mensagem: "Informe um nome e um e-mail válidos."
        });
    }

    if (senha.length < 8) {
        return res.status(400).json({
            mensagem: "A senha deve ter pelo menos 8 caracteres."
        });
    }

    usuarioModel.buscarPorEmail(email)
        .then(function (resultado) {
            if (resultado.length > 0) {
                return res.status(409).json({
                    mensagem: "Este e-mail já está cadastrado."
                });
            }

            return gerarHash(senha)
                .then(function (senhaHash) {
                    return usuarioModel.cadastrar(nome, email, senhaHash);
                })
                .then(function (resultadoCadastro) {
                    res.status(201).json({
                        mensagem: "Cadastro realizado com sucesso!",
                        id_usuario: resultadoCadastro.insertId
                    });
                });
        })
        .catch(function (erro) {
            if (erro.code === "ER_DUP_ENTRY") {
                return res.status(409).json({
                    mensagem: "Este e-mail já está cadastrado."
                });
            }

            res.status(500).json({
                mensagem: "Erro ao realizar cadastro."
            });
        });
}

function login(req, res) {
    var email = req.body.email;
    var senha = req.body.senha;

    if (!email || !senha) {
        return res.status(400).json({
            mensagem: "Informe o e-mail e a senha."
        });
    }

    email = email.trim().toLowerCase();

    usuarioModel.buscarPorEmail(email)
        .then(function (resultado) {
            if (resultado.length === 0) {
                return res.status(401).json({
                    mensagem: "E-mail ou senha incorretos."
                });
            }

            var usuario = resultado[0];

            return compararSenha(senha, usuario.senha_hash)
                .then(function (senhaCorreta) {
                    if (!senhaCorreta) {
                        return res.status(401).json({
                            mensagem: "E-mail ou senha incorretos."
                        });
                    }

                    res.status(200).json({
                        mensagem: "Login realizado com sucesso!",
                        usuario: {
                            id_usuario: usuario.id_usuario,
                            nome: usuario.nome,
                            email: usuario.email
                        }
                    });
                });
        })
        .catch(function (erro) {
            res.status(500).json({
                mensagem: "Erro ao realizar login."
            });
        });
}

module.exports = {
    cadastrar,
    login
};
