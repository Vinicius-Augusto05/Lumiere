
var usuario = sessionStorage.getItem("usuario");
var idTentativa = sessionStorage.getItem("id_tentativa");

if (usuario === null || idTentativa === null) {

    alert("Você precisa responder ao questionário primeiro.");
    window.location.href = "login.html";

} else {

    carregarResultado();
    carregarRecomendacoes();

}

function carregarResultado() {

    fetch("/tentativas/resultado/" + idTentativa)

        .then(function (resposta) {
            if (!resposta.ok) {
                throw new Error("Não foi possível buscar seu resultado.");
            }

            return resposta.json();
        })

        .then(function (dados) {

            if (dados.length === 0) {
                throw new Error("Nenhum resultado encontrado.");
            }

            mostrarEstilo(dados);
            criarGrafico(dados);

        })

        .catch(function (erro) {

            document.getElementById("nomeEstilo").innerText =
                "Ops!";

            document.getElementById("descricaoEstilo").innerText =
                erro.message;

        });

}

function mostrarEstilo(dados) {

    var maiorPontuacao = dados[0].pontos;
    var estilosVencedores = [];

    for (var i = 0; i < dados.length; i++) {

        if (dados[i].pontos === maiorPontuacao) {
            estilosVencedores.push(dados[i]);
        }

    }

    if (estilosVencedores.length === 1) {

        document.getElementById("nomeEstilo").innerText =
            estilosVencedores[0].nome;

        document.getElementById("descricaoEstilo").innerText =
            estilosVencedores[0].descricao;

    } else {

        var nomes = [];

        for (var i = 0; i < estilosVencedores.length; i++) {
            nomes.push(estilosVencedores[i].nome);
        }

        document.getElementById("nomeEstilo").innerText =
            nomes.join(" e ");

        document.getElementById("descricaoEstilo").innerText =
            "Suas respostas mostram uma combinação entre esses estilos.";

    }

}

function criarGrafico(dados) {

    var nomes = [];
    var pontuacoes = [];

    for (var i = 0; i < dados.length; i++) {

        nomes.push(dados[i].nome);
        pontuacoes.push(dados[i].pontos);

    }

    new Chart(document.getElementById("graficoEstilos"), {

        type: "bar",

        data: {
            labels: nomes,

            datasets: [{
                label: "Pontuação",
                data: pontuacoes,
                backgroundColor: "#8eafff",
                borderRadius: 6,
                barThickness: 22
            }]
        },

        options: {

            indexAxis: "y",

            responsive: true,

            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                }
            },

            scales: {

                x: {
                    beginAtZero: true,
                    max: 5,
                    ticks: {
                        stepSize: 1,
                        color: "#aab3c8"
                    },
                    grid: {
                        color: "#26334b"
                    }
                },

                y: {
                    ticks: {
                        color: "#e8ecf7"
                    },
                    grid: {
                        display: false
                    }
                }

            }

        }

    });

}

function carregarRecomendacoes() {

    fetch("/tentativas/recomendacoes/" + idTentativa)

        .then(function (resposta) {

            if (!resposta.ok) {
                throw new Error("Não foi possível buscar as recomendações.");
            }

            return resposta.json();

        })

        .then(function (dados) {

            mostrarRecomendacoes(dados.jogos);

        })

        .catch(function (erro) {

            document.getElementById("jogosRecomendados").innerText =
                erro.message;

        });

}

function mostrarRecomendacoes(jogos) {

    var divJogos = document.getElementById("jogosRecomendados");

    divJogos.innerHTML = "";

    if (jogos.length === 0) {

        divJogos.innerText = "Nenhum jogo encontrado para seus estilos.";

        return;

    }

    for (var i = 0; i < jogos.length; i++) {

        var card = document.createElement("div");
        card.className = "jogo-recomendado";

        var nome = document.createElement("h3");
        nome.innerText = jogos[i].nome;

        var estilo = document.createElement("span");
        estilo.className = "jogo-estilo";
        estilo.innerText = jogos[i].estilo;

        var descricao = document.createElement("p");
        descricao.className = "jogo-descricao";
        descricao.innerText = jogos[i].descricao;

        card.appendChild(estilo);
        card.appendChild(nome);
        card.appendChild(descricao);

        divJogos.appendChild(card);

    }

}
