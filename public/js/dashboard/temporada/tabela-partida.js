const tabelaPartida = document.getElementById("tabelaPartidasBody");

async function exibirDadosTabelaPartida() {
  const dadosTemporada = await buscarTemporada();
  const temporada = dadosTemporada[0];
  const partidas = temporada && temporada.partidas ? temporada.partidas : [];

  tabelaPartida.innerHTML = "";

  if (partidas.length === 0) {
    tabelaPartida.innerHTML = `
      <tr>
        <td colspan="6">
          <div class="estado-vazio">
            <div class="icone-estado-vazio">
              <i class="fa-solid fa-info"></i>
            </div>
            <h2 class="titulo-estado-vazio">Nenhuma partida registrada</h2>
            <p class="descricao-estado-vazio">
              Cadastre sua primeira partida nesta temporada para acompanhar seu desempenho.
            </p>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  for (let i = 0; i < partidas.length; i++) {
    const partida = partidas[i];
    const participacao = partida.gols + partida.assistencias;
    const classeBadgeGols = partida.gols > 0 ? "badge-gols" : "badge-neutro";
    const classeBadgeAssist =
      partida.assistencias > 0 ? "badge-assist" : "badge-neutro";

    tabelaPartida.innerHTML += `
      <tr id="partida-row-${i}">
        <td class="col-data">${formatarData("default", partida.dt_partida)}</td>
        <td class="col-adversario">${partida.adversario}</td>
        <td>
          <span class="badge-tabela ${classeBadgeGols}">${partida.gols} ${partida.gols === 1 ? "gol" : "gols"}</span>
        </td>
        <td>
          <span class="badge-tabela ${classeBadgeAssist}">${partida.assistencias} assist.</span>
        </td>
        <td class="col-participacao">${participacao} G+A</td>
        <td class="col-acoes">
          <button
            onclick="abrirModalEditarPartida(${partida.id})"
            class="btn-acao-editar"
          >
            Editar
          </button>
          <button
            onclick="abrirModalDeletarPartida(${partida.id})"
            class="btn-acao-excluir"
          >
            Excluir
          </button>
        </td>
      </tr>
    `;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  exibirDadosTabelaPartida();
});
