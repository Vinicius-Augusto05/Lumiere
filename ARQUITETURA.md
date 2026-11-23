# Arquitetura do Lumière

## 1. Visão geral

O Lumière utiliza uma arquitetura dividida em três partes principais: frontend, backend e banco de dados.

Essa divisão permite organizar o sistema, separar responsabilidades e facilitar a manutenção e evolução do projeto.

### 1.1 Frontend

Responsável pela parte visual e pela interação com o usuário.

Tecnologias:
- **HTML:** estrutura das páginas.
- **CSS:** aparência e identidade visual.
- **JavaScript:** interações, validações e comunicação com a API.
- **Chart.js:** criação do gráfico de resultados na dashboard.

### 1.2 Backend

Responsável pelo processamento das informações, pelas regras de funcionamento do sistema e pela comunicação com o banco de dados.

Tecnologias:
- **Node.js:** execução do JavaScript no servidor.
- **Express:** organização da aplicação e das rotas HTTP.
- **API:** comunicação entre frontend e backend.

### 1.3 Banco de dados

Responsável por armazenar e organizar as informações do Lumière.

Tecnologias:
- **MySQL:** gerenciamento dos dados.
- **Linux:** sistema operacional da máquina virtual utilizada para executar o banco de dados.

## 2. Fluxo de comunicação

A comunicação do Lumière segue o fluxo:

**Frontend → Backend → Banco de dados**

O frontend envia solicitações ao backend por meio de requisições HTTP. O backend processa essas solicitações e, quando necessário, realiza consultas ou alterações no banco de dados MySQL.

Após o processamento, o backend retorna uma resposta ao frontend, que apresenta as informações ao usuário.

### 2.1 Exemplo de cadastro

1. O usuário preenche o formulário de cadastro.
2. O JavaScript realiza as validações iniciais.
3. Os dados são enviados para a API do Lumière.
4. O backend recebe e processa as informações.
5. O backend realiza a operação necessária no MySQL.
6. O banco de dados retorna o resultado da operação.
7. O backend envia uma resposta ao frontend.
8. O frontend apresenta uma mensagem ao usuário.

### 2.2 Responsabilidade de cada camada

| Camada | Responsabilidade |
|---|---|
| Frontend | Exibir informações, receber interações e enviar requisições. |
| Backend | Processar dados, executar regras e realizar consultas no banco. |
| Banco de dados | Armazenar e fornecer informações. |

## 3. Funcionalidades e responsabilidades

### 3.1 Cadastro e login

- **Frontend:** formulários de cadastro e login.
- **Backend:** recebimento dos dados, processamento do cadastro e autenticação.
- **Banco de dados:** armazenamento dos usuários e das senhas protegidas por hash.

### 3.2 Questionário de estilos de jogadores

- **Frontend:** apresentação das cinco perguntas e suas alternativas.
- **Backend:** recebimento das respostas e processamento da tentativa.
- **Banco de dados:** armazenamento das perguntas, alternativas, tentativas e respostas.

### 3.3 Resultado do questionário

- **Frontend:** apresentação das pontuações dos seis estilos.
- **Backend:** consulta e organização das pontuações obtidas pelo usuário.
- **Banco de dados:** fornecimento das respostas utilizadas no cálculo dos resultados.

### 3.4 Dashboard e recomendações

- **Frontend:** exibição dos resultados, gráfico e jogos recomendados.
- **Backend:** fornecimento das pontuações e dos jogos relacionados aos dois estilos com maior pontuação.
- **Banco de dados:** armazenamento e consulta dos estilos e jogos cadastrados.

A dashboard apresenta quatro recomendações: dois jogos para cada um dos dois estilos com maior pontuação.

### 3.5 Conteúdo público

- **Frontend:** apresentação da página inicial, biblioteca de jogos e páginas individuais dos jogos.
- **Backend:** não é necessário para a exibição dos conteúdos públicos.
- **Banco de dados:** não é necessário para a navegação nessas páginas.

## 4. Estrutura de pastas do projeto

O projeto está organizado da seguinte maneira:

```text
Lumiere/
│
├── api/
│   ├── app.js
│   ├── package.json
│   │
│   ├── public/
│   │   ├── index.html
│   │   ├── style.css
│   │   ├── login.html
│   │   ├── cadastro.html
│   │   ├── quiz.html
│   │   ├── dashboard.html
│   │   ├── acesso.css
│   │   ├── acesso.js
│   │   ├── cadastro.js
│   │   ├── quiz.css
│   │   ├── quiz.js
│   │   ├── dashboard.css
│   │   └── dashboard.js
│   │
│   └── src/
│       ├── controllers/
│       │   ├── estiloController.js
│       │   ├── usuarioController.js
│       │   └── tentativaController.js
│       │
│       ├── models/
│       │   ├── estiloModel.js
│       │   └── usuarioModel.js
│       │
│       ├── routes/
│       │   ├── estilos.js
│       │   ├── usuarios.js
│       │   └── tentativas.js
│       │
│       └── database/
│           └── config.js
│
├── README.md
├── ESCOPO.md
├── REQUISITOS.md
├── ARQUITETURA.md
├── MODELO-DADOS.md
└── DIARIO-DE-PROMPTS.md
```

Os arquivos de configuração de ambiente e outros arquivos auxiliares também fazem parte do projeto, mas não são detalhados aqui para evitar a exposição de informações sensíveis.

## 5. Ambientes de execução

O Lumière utiliza dois ambientes principais:

### 5.1 Ambiente da aplicação

O frontend e o backend são executados no computador do desenvolvedor.

- **Frontend:** arquivos HTML, CSS e JavaScript.
- **Backend:** aplicação Node.js.
- **Porta da aplicação:** 3333.

O servidor disponibiliza as páginas e a API para o navegador.

### 5.2 Ambiente do banco de dados

O banco MySQL é executado em uma máquina virtual com Ubuntu Linux, utilizando o Oracle VM VirtualBox.

A comunicação entre a aplicação e o banco de dados ocorre por meio do encaminhamento de portas configurado na máquina virtual.

A aplicação utiliza a porta 3308 no computador hospedeiro para acessar a porta 3306 do MySQL na máquina virtual.

Essa configuração permite manter o banco de dados em um ambiente separado da aplicação.

## 6. Segurança e boas práticas

O Lumière utiliza práticas para proteger as informações dos usuários e manter a organização do sistema.

### 6.1 Proteção de senhas

- As senhas não são armazenadas em texto puro.
- O sistema utiliza hash para proteger as senhas.
- O processamento do cadastro e do login ocorre no backend.

### 6.2 Comunicação com o banco

- O frontend não acessa diretamente o banco de dados.
- As consultas são realizadas pelo backend.
- São utilizadas consultas parametrizadas para reduzir riscos de SQL Injection.
- As credenciais de conexão são mantidas em arquivo de configuração de ambiente, sem necessidade de inseri-las diretamente no código-fonte.

### 6.3 Organização do código

- Separação entre frontend, backend e banco de dados.
- Organização das rotas, controllers e models.
- Reutilização de funções quando possível.
- Registro da evolução do projeto por meio de commits no Git.

## 7. Considerações finais

A arquitetura do Lumière permite separar as responsabilidades de cada camada, facilitando o desenvolvimento, os testes e a manutenção do sistema.

A comunicação entre frontend, backend e banco de dados possibilita o funcionamento integrado das funcionalidades, desde o cadastro do usuário até a apresentação dos resultados e recomendações na dashboard.