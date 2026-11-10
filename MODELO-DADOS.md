Documento inicial de planejamento das entidades e relacionamentos do banco de dados MySQL.

# Modelo de Dados — Lumière

Este documento apresenta a estrutura inicial do banco de dados do Lumière, identificando as tabelas, seus atributos e os relacionamentos necessários para o funcionamento do sistema.

## 1. Tabela: usuario

- id_usuario INT PRIMARY KEY AUTO_INCREMENT
- nome VARCHAR(45) NOT NULL
- email VARCHAR(150) NOT NULL UNIQUE
- senha_hash VARCHAR(255) NOT NULL
- data_cadastro DATETIME NOT NULL
