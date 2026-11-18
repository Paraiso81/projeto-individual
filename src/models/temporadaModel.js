var database = require("../database/config");
var partidaModel = require("./partidasModel");

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

async function consultarTemporadasUsuario(usuarioId) {
  var sql = `
  SELECT 
    t.id, t.nome, t.ano, 
    p.id partidaId, p.adversario, p.gols, p.assistencias, p.dt_partida , p.fk_temporada 
    FROM usuario u 
  JOIN temporada t ON t.fk_usuario = u.id 
  LEFT JOIN partida p ON p.fk_temporada = t.id 
  WHERE u.id = ?`;
  const data = await database.executar(sql, [usuarioId]);
  const temporadas = [];

  for (let i = 0; i < data.length; i++) {
    let linha = data[i];

    let temporada = temporadas.find((temporada) => temporada.id === linha.id);

    if (!temporada) {
      temporada = {
        id: linha.id,
        nome: linha.nome,
        ano: linha.ano,
        partidas: [],
      };
      temporadas.push(temporada);
    }

    if (linha.partidaId !== null) {
      temporada.partidas.push({
        id: linha.partidaId,
        adversario: linha.adversario,
        gols: linha.gols,
        assistencias: linha.assistencias,
        dt_partida: linha.dt_partida,
      });
    }
  }
  return temporadas;
}

async function buscarTemporada(temporadaId, usuarioId) {
  var sql = `SELECT t.id, t.nome, t.ano
    FROM temporada t
    WHERE t.id = ? AND t.fk_usuario = ?;
    `;

  const temporada = await database.executar(sql, [temporadaId, usuarioId]);

  if (temporada.length === 0) {
    return [];
  }

  const partidasTemporada = await partidaModel.partidasPorTemporada(
    temporadaId,
    usuarioId,
  );
  const id = temporada[0].id;
  const nome = temporada[0].nome;
  const ano = temporada[0].ano;

  return [{ id: id, nome: nome, ano: ano, partidas: partidasTemporada }];
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
    const dadosTemporadaAtualizado = await buscarTemporada(
      temporadaId,
      usuarioId,
    );

    return dadosTemporadaAtualizado;
  }

  return;
}

async function deletarTemporada(temporadaId, usuarioId) {
  await partidaModel.deletarPartidasPorTemporada(temporadaId);

  var sql = `DELETE FROM temporada WHERE id = ? AND fk_usuario = ?`;

  return database.executar(sql, [temporadaId, usuarioId]);
}

module.exports = {
  createTemporada,
  consultarTemporada,
  consultarTemporadasUsuario,
  buscarTemporada,
  atualizarTemporada,
  deletarTemporada,
};
