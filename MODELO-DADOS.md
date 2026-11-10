Documento inicial de planejamento das entidades e relacionamentos do banco de dados MySQL.

# Modelo de Dados — Lumière

Este documento apresenta a estrutura inicial do banco de dados do Lumière, identificando as tabelas, seus atributos e os relacionamentos necessários para o funcionamento do sistema.

## 1. Tabela: usuario

- id_usuario INT PRIMARY KEY AUTO_INCREMENT
- nome VARCHAR(45) NOT NULL
- email VARCHAR(150) NOT NULL UNIQUE
- senha_hash VARCHAR(255) NOT NULL
- data_cadastro DATETIME NOT NULL

## 2. Tabela: estilo

- id_estilo INT PRIMARY KEY AUTO_INCREMENT
- nome VARCHAR(45) NOT NULL UNIQUE
- descricao VARCHAR(255) NOT NULL


## 3. Tabela: pergunta

- id_pergunta INT PRIMARY KEY AUTO_INCREMENT
- enunciado VARCHAR(255) NOT NULL
- ordem INT NOT NULL UNIQUE


## 4. Tabela: alternativa

- id_alternativa INT PRIMARY KEY AUTO_INCREMENT
- descricao VARCHAR(255) NOT NULL
- fk_pergunta INT NOT NULL
- fk_estilo INT NOT NULL


## 5. Tabela: tentativa

- id_tentativa INT PRIMARY KEY AUTO_INCREMENT
- fk_usuario INT NOT NULL
- data_realizacao DATETIME NOT NULL


## 6. Tabela: resposta

- id_resposta INT PRIMARY KEY AUTO_INCREMENT
- fk_tentativa INT NOT NULL
- fk_alternativa INT NOT NULL


## 7. Relacionamentos entre as tabelas

1. **usuario → tentativa**
   - Um usuário pode possuir várias tentativas.
   - FK: tentativa.fk_usuario → usuario.id_usuario
   - Relacionamento: 1:N

2. **tentativa → resposta**
   - Uma tentativa pode possuir várias respostas.
   - FK: resposta.fk_tentativa → tentativa.id_tentativa
   - Relacionamento: 1:N

3. **pergunta → alternativa**
   - Uma pergunta pode possuir várias alternativas.
   - FK: alternativa.fk_pergunta → pergunta.id_pergunta
   - Relacionamento: 1:N

4. **estilo → alternativa**
   - Um estilo pode estar associado a várias alternativas.
   - FK: alternativa.fk_estilo → estilo.id_estilo
   - Relacionamento: 1:N

5. **alternativa → resposta**
   - Uma alternativa pode ser selecionada em várias respostas.
   - FK: resposta.fk_alternativa → alternativa.id_alternativa
   - Relacionamento: 1:N


## 8. Diagrama lógico do banco de dados

O diagrama abaixo representa a estrutura do banco de dados do Lumière, incluindo suas seis tabelas, chaves primárias, chaves estrangeiras e relacionamentos.

![Diagrama lógico do Lumière](Modelo_Logico_Lumiere.png)

### Arquivo editável

O modelo também está disponível no formato `.mwb`, que pode ser aberto e editado no MySQL Workbench.

[Modelo editável do banco de dados](Lumiere.mwb)
