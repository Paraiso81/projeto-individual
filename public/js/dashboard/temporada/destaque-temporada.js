const destaqueAdversario = document.getElementById("destaqueAdversario");
const destaqueData = document.getElementById("destaqueData");
const destaqueGols = document.getElementById("destaqueGols");
const destaqueAssistencias = document.getElementById("destaqueAssistencias");
const destaqueParticipacao = document.getElementById("destaqueParticipacao");

async function exibirMelhorPartida() {
  const dadosTemporada = await buscarTemporada();
  const temporada = dadosTemporada[0];
  const partidas = temporada && temporada.partidas ? temporada.partidas : [];

  if (partidas.length === 0) {
    destaqueAdversario.innerText = "Sem partidas registradas";
    destaqueData.innerText = "Cadastre uma partida para ver seu destaque";
    destaqueGols.innerText = "0 Gols";
    destaqueAssistencias.innerText = "0 Assistências";
    destaqueParticipacao.innerText = "Nenhuma participação registrada";
    return;
  }

  let melhorPartida = partidas[0];
  let melhorParticipacao =
    (Number(melhorPartida.gols) || 0) +
    (Number(melhorPartida.assistencias) || 0);

  for (let i = 1; i < partidas.length; i++) {
    const partida = partidas[i];
    const gols = Number(partida.gols) || 0;
    const assistencias = Number(partida.assistencias) || 0;
    const participacao = gols + assistencias;

    if (
      participacao > melhorParticipacao ||
      (participacao === melhorParticipacao &&
        gols > (Number(melhorPartida.gols) || 0))
    ) {
      melhorPartida = partida;
      melhorParticipacao = participacao;
    }
  }

  const golsDestaque = Number(melhorPartida.gols) || 0;
  const assistDestaque = Number(melhorPartida.assistencias) || 0;

  destaqueAdversario.innerText = `vs ${melhorPartida.adversario}`;
  destaqueData.innerText = `Realizada em ${formatarData("long", melhorPartida.dt_partida)}`;
  destaqueGols.innerText = `${golsDestaque} ${golsDestaque === 1 ? "Gol" : "Gols"}`;
  destaqueAssistencias.innerText = `${assistDestaque} ${assistDestaque === 1 ? "Assistência" : "Assistências"}`;
  destaqueParticipacao.innerText =
    melhorParticipacao > 0
      ? `Participação direta em ${melhorParticipacao} ${melhorParticipacao === 1 ? "gol" : "gols"} na partida`
      : "Sem participações diretas em gols na partida";
}

document.addEventListener("DOMContentLoaded", () => {
  exibirMelhorPartida();
});
