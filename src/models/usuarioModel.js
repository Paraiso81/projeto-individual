var database = require("../database/config.js");

function cadastrar(nome, email, senha) {
  console.log("acessado o model user", nome, email, senha);
  var sql = `
    INSERT INTO (nome, email, senha) VALUES (?, ?, ?)
    [${nome}, ${email}, ${senha}]
    `;

  return database.executar(sql);
}
