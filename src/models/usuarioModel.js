var database = require("../database/config.js");

function cadastrar(nome, email, senha) {
  console.log("acessado o model user", nome, email, senha);
  var sql = `INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)`;

  return database.executar(sql, [nome, email, senha]);
}

function consultarUsuario(email) {
  console.log("consultando email", email);
  var sql = `SELECT email FROM usuario WHERE email = ?`;

  return database.executar(sql, [email]);
}

function login(email, senha) {
  var sql = `SELECT id, nome, email FROM usuario WHERE email = ? AND senha = ?`;

  return database.executar(sql, [email, senha]);
}

module.exports = {
  cadastrar,
  login,
  consultarUsuario,
};
