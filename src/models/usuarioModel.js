var database = require("../database/config.js");

function cadastrar(nome, email, senha) {
  console.log("acessado o model user", nome, email, senha);
  var sql = `INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)`;

  return database.executar(sql, [nome, email, senha]);
}

function login(email, senha) {
  var sql = `SELECT id, nome, email FROM usuario WHERE email = ? AND senha = ?`;

  return database.executar(sql, [email, senha]);
}

function consultarUsuario(id, email) {
  const campos = [];
  const valores = [];

  if (id !== undefined) {
    campos.push("id = ?");
    valores.push(id);
    console.log("consultando por id", id);
  } else {
    campos.push("email = ?");
    valores.push(email);
    console.log("consultando email", email);
  }
  var sql = `SELECT id, email FROM usuario WHERE ${campos.join(",")}`;

  return database.executar(sql, valores);
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

  return;
}

async function deletarUsuario(usuarioId) {
  var sqlPartidas = `DELETE p FROM partida p JOIN temporada t ON t.id = p.fk_temporada WHERE t.fk_usuario = ?`;
  await database.executar(sqlPartidas, [usuarioId]);

  var sqlTemporadas = `DELETE FROM temporada WHERE fk_usuario = ?`;
  await database.executar(sqlTemporadas, [usuarioId]);

  var sqlUsuario = `DELETE FROM usuario WHERE id = ?`;
  return database.executar(sqlUsuario, [usuarioId]);
}

module.exports = {
  cadastrar,
  login,
  atualizarUsuario,
  consultarUsuario,
  deletarUsuario,
};
