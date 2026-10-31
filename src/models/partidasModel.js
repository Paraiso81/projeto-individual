var database = require("../database/config");

function createPartida(
  dt_partida,
  adversario,
  temporadaId,
  gols,
  assistencias,
) {
  const campos = [];
  const valores = [];
  const qtdCampos = [];
  let contadorCampos = 3;

  campos.push("dt_partida");
  valores.push(dt_partida);

  campos.push("adversario");
  valores.push(adversario);

  campos.push("fk_temporada");
  valores.push(temporadaId);

  if (gols !== undefined && assistencias !== undefined) {
    campos.push("gols");
    valores.push(gols);
    campos.push("assistencias");
    valores.push(assistencias);
    contadorCampos += 2;
  }

  for (let i = 0; i < contadorCampos; i++) {
    qtdCampos.push("?");
  }

  var sql = `INSERT INTO partida (${campos}) VALUES (${qtdCampos})`;

  return database.executar(sql, valores);
}

function partidasPorTemporada(temporadaId, usuarioId) {
  var sql = `SELECT p.dt_partida, p.adversario, p.gols, p.assistencias 
  FROM partida p
    JOIN temporada t
  ON t.id = p.fk_temporada
  WHERE t.fk_usuario = ? AND t.id = ?`;

  return database.executar(sql, [usuarioId, temporadaId]);
}

function buscarPartida(temporadaId, usuarioId, partidaId) {
  var sql = `SELECT p.dt_partida, p.adversario, p.gols, p.assistencias, t.nome
    FROM partida p
    JOIN temporada t
        ON t.id = p.fk_temporada
    WHERE p.fk_temporada = ? AND t.fk_usuario = ? AND p.id = ?`;

  return database.executar(sql, [temporadaId, usuarioId, partidaId]);
}

async function atualizarPartida(
  usuarioId,
  temporadaId,
  partidaId,
  dt_partida,
  adversario,
  gols,
  assistencias,
) {
  const dt_atualizacao = new Date();
  const campos = [];
  const valores = [];

  if (dt_partida !== undefined) {
    campos.push("dt_partida = ?");
    valores.push(dt_partida);
  }

  if (adversario !== undefined) {
    campos.push("adversario = ?");
    valores.push(adversario);
  }

  if (gols !== undefined) {
    campos.push("gols = ?");
    valores.push(gols);
  }

  if (assistencias !== undefined) {
    campos.push("assistencias = ?");
    valores.push(assistencias);
  }

  campos.push("dt_atualizacao = ?");
  valores.push(dt_atualizacao);
  valores.push(partidaId);
  valores.push(temporadaId);

  var sql = `UPDATE partida SET ${campos.join(", ")} WHERE id = ? AND fk_temporada = ?`;

  const update = await database.executar(sql, valores);

  if (update.affectedRows > 0) {
    const dadosPartidaAtualizada = await buscarPartida(
      temporadaId,
      usuarioId,
      partidaId,
    );

    return dadosPartidaAtualizada;
  }

  return;
}

function deletarPartida(temporadaId, partidaId) {
  var sql = `DELETE FROM partida WHERE id = ? AND fk_temporada = ?`;

  return database.executar(sql, [partidaId, temporadaId]);
}

function deletarPartidasPorTemporada(temporadaId) {
  var sql = `DELETE FROM partida WHERE fk_temporada = ?`;

  return database.executar(sql, [temporadaId]);
}

module.exports = {
  createPartida,
  partidasPorTemporada,
  buscarPartida,
  atualizarPartida,
  deletarPartida,
  deletarPartidasPorTemporada,
};
