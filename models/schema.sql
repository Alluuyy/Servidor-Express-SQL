CREATE DATABASE IF NOT EXISTS desafio_db;
USE desafio_db;

CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    sobrenome VARCHAR(100),
    email VARCHAR(100),
    idade INT
);

CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    descricao VARCHAR(255),
    preco DECIMAL(10, 2),
    data_atualizado DATETIME
);
