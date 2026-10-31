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

async function atualizarUsuario(usuarioId, { nome, email }) {
  const campos = [];
  const valores = [];

  if (nome !== undefined) {
    campos.push("nome = ?");
    valores.push(nome);
  }

  if (email !== undefined) {
    campos.push("email = ?");
    valores.push(email);
  }
  valores.push(usuarioId);
  var sqlUpdate = `UPDATE usuario SET ${campos.join(",")} WHERE id = ?`;
  var sqlSelect = `SELECT id, nome, email FROM usuario WHERE id = ?`;

  const update = await database.executar(sqlUpdate, valores);

  if (update) {
    return database.executar(sqlSelect, [usuarioId]);
  }
}

module.exports = {
  cadastrar,
  login,
  atualizarUsuario,
  consultarUsuario,
};
