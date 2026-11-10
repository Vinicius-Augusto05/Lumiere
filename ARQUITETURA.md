
# Arquitetura do Lumière

## 1. Visão geral

O Lumière será desenvolvido utilizando uma arquitetura dividida em três partes principais: frontend, backend e banco de dados.

Essa divisão permite organizar o sistema, separar responsabilidades e facilitar a manutenção e evolução do projeto.

### 1.1 Frontend

Responsável pela parte visual e pela interação com o usuário.

Tecnologias:
- HTML: estrutura das páginas.
- CSS: aparência e identidade visual.
- JavaScript: interações, validações e funcionalidades.

### 1.2 Backend

Responsável pelo processamento das informações e pelas regras de funcionamento do sistema.

Tecnologia:
- Node.js: execução do JavaScript no servidor.
- API: comunicação entre o frontend e o banco de dados.

### 1.3 Banco de dados

Responsável por armazenar e organizar as informações do Lumière.

Tecnologias:
- MySQL: gerenciamento dos dados.
- Linux: ambiente da máquina virtual utilizada para hospedar o banco de dados.


## 2. Fluxo de comunicação

A comunicação do Lumière seguirá o fluxo:

**Frontend → Backend → Banco de dados**

O frontend enviará solicitações ao backend por meio de requisições HTTP. O backend processará essas solicitações e, quando necessário, realizará consultas ou alterações no banco de dados MySQL.

Após o processamento, o backend retornará uma resposta ao frontend.

### 2.1 Exemplo de cadastro

1. O usuário preenche o formulário de cadastro.
2. O JavaScript realiza as validações iniciais.
3. Os dados são enviados para a API do Lumière.
4. O backend valida as informações recebidas.
5. O backend consulta ou insere os dados no MySQL.
6. O banco retorna o resultado da operação.
7. O backend envia uma resposta ao frontend.
8. O frontend apresenta uma mensagem ao usuário.

### 2.2 Responsabilidade de cada camada

| Camada | Responsabilidade |
|---|---|
| Frontend | Exibir informações e receber interações. |
| Backend | Processar dados e executar regras do sistema. |
| Banco de dados | Armazenar e fornecer informações. |


## 3. Funcionalidades e responsabilidades

### 3.1 Cadastro e login

- Frontend: formulários de cadastro e login.
- Backend: validação dos dados e autenticação do usuário.
- Banco de dados: armazenamento dos usuários e suas senhas protegidas por hash.

### 3.2 Quiz de estilos de jogadores

- Frontend: apresentação das perguntas e alternativas.
- Backend: recebimento das respostas e cálculo do resultado.
- Banco de dados: armazenamento das perguntas, alternativas e tentativas realizadas.

### 3.3 Resultado do quiz

- Frontend: apresentação do estilo predominante e dos resultados.
- Backend: cálculo das pontuações e dos percentuais de cada estilo.
- Banco de dados: consulta das respostas e informações da tentativa.

### 3.4 Dashboard

- Frontend: exibição dos resultados, gráficos e histórico.
- Backend: fornecimento dos dados necessários para o dashboard.
- Banco de dados: armazenamento e consulta do histórico de tentativas.

### 3.5 Conteúdo público

- Frontend: apresentação da página inicial, da história pessoal e dos conteúdos sobre jogos.
- Backend: poderá fornecer conteúdos caso seja necessário.
- Banco de dados: não será obrigatório para as páginas públicas inicialmente.


## 4. Estrutura de pastas planejada

O projeto será organizado para separar os arquivos do frontend, backend e documentação.

```text
Lumiere/
│
├── frontend/
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── assets/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   └── database/
│   │
│   └── package.json
│
├── documentacao/
│   ├── Modelo_Logico_Lumiere.png
│   └── Lumiere.mwb
│
├── README.md
├── ESCOPO.md
├── REQUISITOS.md
├── MODELO_DADOS.md
└── ARQUITETURA.md
```

Essa estrutura poderá ser ajustada durante o desenvolvimento, conforme as necessidades do projeto.

## 5. Ambientes de execução

O Lumière utilizará dois ambientes principais:

### 5.1 Ambiente de aplicação

Responsável pela execução do frontend e backend.

- Frontend: HTML, CSS e JavaScript.
- Backend: Node.js.
- Comunicação: requisições HTTP.

### 5.2 Ambiente de banco de dados

O banco MySQL será executado em uma máquina virtual Linux.

Essa separação permite manter o banco de dados em um ambiente próprio, independente da aplicação.


## 6. Segurança e boas práticas

O Lumière adotará medidas para proteger as informações dos usuários e manter a organização do sistema.

### 6.1 Proteção de senhas

- As senhas não serão armazenadas em texto puro.
- Será utilizado hash de senha com algoritmo adequado, como bcrypt.
- A autenticação será realizada pelo backend.

### 6.2 Comunicação com o banco

- O frontend não terá acesso direto ao banco de dados.
- As consultas serão realizadas pelo backend.
- Serão utilizadas consultas parametrizadas para reduzir riscos de SQL Injection.

### 6.3 Organização do código

- Separação entre frontend, backend e banco de dados.
- Reutilização de funções quando possível.
- Organização das rotas e regras de negócio.
- Registro das alterações por meio de commits no Git.

## 7. Considerações finais

A arquitetura proposta busca manter o Lumière organizado, seguro e de fácil manutenção.

A separação entre frontend, backend e banco de dados permitirá desenvolver as funcionalidades de maneira gradual, facilitando os testes, a identificação de erros e a evolução do projeto.
