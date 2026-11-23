
var form_cadastro = document.getElementById("form_cadastro");

form_cadastro.addEventListener("submit", function (evento) {
    evento.preventDefault();

    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    var mensagem = document.getElementById("mensagem");

    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: nome,
            email: email,
            senha: senha
        })
    })
    .then(function (resposta) {
        return resposta.json().then(function (dados) {
            if (!resposta.ok) {
                throw new Error(dados.mensagem);
            }

            return dados;
        });
    })
    .then(function (dados) {
        mensagem.style.color = "#8eafff";
        mensagem.innerHTML = dados.mensagem;

        form_cadastro.reset();

        setTimeout(function () {
            window.location.href = "login.html";
        }, 1500);
    })
    .catch(function (erro) {
        mensagem.style.color = "#ff8585";
        mensagem.innerHTML = erro.message;
    });
});
