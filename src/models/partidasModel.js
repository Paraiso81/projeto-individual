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

module.exports = {
  createPartida,
};
