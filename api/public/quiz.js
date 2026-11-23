
var usuario = sessionStorage.getItem("usuario");

if (usuario === null) {
    alert("Você precisa entrar na sua conta para responder ao questionário.");
    window.location.href = "login.html";
} else {
    usuario = JSON.parse(usuario);
}

var perguntas = [];
var perguntaAtual = 0;
var respostas = [];

function carregarPerguntas() {

    fetch("/estilos/perguntas")
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (dados) {

            perguntas = dados;

            if (perguntas.length === 0) {
                document.getElementById("pergunta").innerText =
                    "Nenhuma pergunta encontrada.";
                return;
            }

            mostrarPergunta();

        })
        .catch(function (erro) {

            document.getElementById("pergunta").innerText =
                "Não foi possível carregar o questionário.";

        });

}

function mostrarPergunta() {

    var pergunta = perguntas[perguntaAtual];

    document.getElementById("progresso").innerText =
        "PERGUNTA " + (perguntaAtual + 1) + " DE " + perguntas.length;

    document.getElementById("quizBarraPreenchida").style.width =
        ((perguntaAtual + 1) / perguntas.length) * 100 + "%";

    document.getElementById("pergunta").innerText =
        pergunta.enunciado;

    var alternativasHTML = "";

    for (var i = 0; i < pergunta.alternativas.length; i++) {

        var alternativa = pergunta.alternativas[i];

        alternativasHTML += `
            <button
                class="quiz-alternativa"
                onclick="selecionarAlternativa(${alternativa.id_alternativa})">
                ${alternativa.descricao}
            </button>
        `;

    }

    document.getElementById("alternativas").innerHTML =
        alternativasHTML;

    document.getElementById("botaoProximo").disabled = true;

    if (perguntaAtual === perguntas.length - 1) {
        document.getElementById("botaoProximo").innerText =
            "Finalizar questionário";
    } else {
        document.getElementById("botaoProximo").innerText =
            "Próxima pergunta";
    }

}

function selecionarAlternativa(idAlternativa) {

    respostas[perguntaAtual] = idAlternativa;

    var botoes = document.getElementsByClassName("quiz-alternativa");

    for (var i = 0; i < botoes.length; i++) {

        botoes[i].classList.remove("selecionada");

        if (
            Number(botoes[i].getAttribute("onclick").match(/\d+/)[0])
            === idAlternativa
        ) {
            botoes[i].classList.add("selecionada");
        }

    }

    document.getElementById("botaoProximo").disabled = false;

}

function proximaPergunta() {

    if (respostas[perguntaAtual] === undefined) {
        return;
    }

    if (perguntaAtual < perguntas.length - 1) {

        perguntaAtual++;

        mostrarPergunta();

    } else {

        document.getElementById("botaoProximo").disabled = true;
        document.getElementById("botaoProximo").innerText = "Salvando...";

        fetch("/tentativas/salvar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id_usuario: usuario.id_usuario,
                respostas: respostas
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

            sessionStorage.setItem("id_tentativa", dados.id_tentativa);

            window.location.href = "dashboard.html";

        })
        .catch(function (erro) {

            alert(erro.message);

            document.getElementById("botaoProximo").disabled = false;
            document.getElementById("botaoProximo").innerText =
                "Finalizar questionário";

        });

    }

}

document.getElementById("botaoProximo").onclick = proximaPergunta;

carregarPerguntas();
