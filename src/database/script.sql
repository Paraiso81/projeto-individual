CREATE DATABASE projeto_individual;
USE projeto_individual;

CREATE TABLE usuario (
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100),
email VARCHAR(100) UNIQUE,
senha VARCHAR(100),
dt_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
dt_atualizacao DATETIME
);

CREATE TABLE temporada (
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45) NOT NULL,
ano YEAR,
dt_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
dt_atualizacao DATETIME,
fk_usuario INT NOT NULL,

CONSTRAINT uq_temporada_nome_usuario UNIQUE (nome, fk_usuario),
CONSTRAINT fk_temporada_usuario FOREIGN KEY (fk_usuario) REFERENCES usuario (id)
);

CREATE TABLE partida (
id INT PRIMARY KEY AUTO_INCREMENT,
dt_partida DATE,
adversario VARCHAR(45),
gols INT,
assistencias INT,
dt_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
dt_atualizacao DATETIME,
fk_temporada INT NOT NULL,

CONSTRAINT ck_fk_temporada 
	FOREIGN KEY (fk_temporada) REFERENCES temporada (id)
);

SELECT * FROM usuario;
SELECT * FROM partida;
SELECT * FROM temporada;

-- mysqldump -u individual -h localhost -p