
var form_login = document.getElementById("form_login");

form_login.addEventListener("submit", function (evento) {

    evento.preventDefault();

    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    var mensagem = document.getElementById("mensagem");

    fetch("/usuarios/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
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

        sessionStorage.setItem("usuario", JSON.stringify(dados.usuario));

        mensagem.style.color = "#8eafff";
        mensagem.innerHTML = "Login realizado! Redirecionando...";

        setTimeout(function () {

            window.location.href = "quiz.html";

        }, 1000);

    })
    .catch(function (erro) {

        mensagem.style.color = "#ff8585";
        mensagem.innerHTML = erro.message;

    });

});
