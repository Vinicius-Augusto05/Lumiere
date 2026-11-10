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
