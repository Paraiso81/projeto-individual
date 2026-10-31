var database = require("../database/config");

function createTemporada(nome, ano, usuarioId) {
  console.log(nome, ano, usuarioId, "dados model");
  var sql = `INSERT INTO temporada (nome, fk_usuario, ano) VALUES (?, ?, ?)`;

  return database.executar(sql, [nome, usuarioId, ano]);
}

function consultarTemporada(id, nome, ano) {
  const campos = [];
  const valores = [];

  if (id !== undefined) {
    campos.push("id = ?");
    valores.push(id);
  }

  if (nome !== undefined) {
    campos.push("nome = ?");
    valores.push(nome);
  }

  if (ano !== undefined) {
    campos.push("ano = ?");
    valores.push(ano);
  }

  var sql = `SELECT id, nome, ano, fk_usuario FROM temporada WHERE ${campos.join(",")}`;

  return database.executar(sql, valores);
}

function consultarTemporadasUsuario(usuarioId) {
  var sql = `SELECT t.id, t.nome, t.ano FROM usuario u JOIN temporada t ON t.fk_usuario = u.id WHERE u.id = ?`;
  return database.executar(sql, [usuarioId]);
}

async function buscarTemporada(temporadaId, usuarioId) {
  var sql = `SELECT t.id, t.nome, t.ano
    FROM temporada t
    WHERE t.id = ? AND t.fk_usuario = ?;
    `;

  return database.executar(sql, [temporadaId, usuarioId]);
}

async function atualizarTemporada(usuarioId, temporadaId, nome, ano) {
  const dt_atualizacao = new Date();
  const campos = [];
  const valores = [];

  if (nome !== undefined) {
    campos.push("nome = ?");
    valores.push(nome);
  }

  if (ano !== undefined) {
    campos.push("ano = ?");
    valores.push(ano);
  }
  campos.push("dt_atualizacao = ?");
  valores.push(dt_atualizacao);
  valores.push(temporadaId);

  var sql = `UPDATE temporada SET ${campos.join(",")} WHERE id = ?`;

  const update = await database.executar(sql, valores);

  if (update.affectedRows > 0) {
    const dadosTemporadaAtualizado = await buscarTemporada(temporadaId, usuarioId);

    return dadosTemporadaAtualizado;
  }

  return;
}

async function deletarTemporada(temporadaId) {
    
}

module.exports = {
  createTemporada,
  consultarTemporada,
  consultarTemporadasUsuario,
  buscarTemporada,
  atualizarTemporada,
};
