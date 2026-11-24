const nomeTemporada = document.getElementById("iptNomeTemporada");
const anoTemporada = document.getElementById("iptAnoTemporada");

async function criarTemporada() {
  const nome = nomeTemporada.value.trim();
  const ano = anoTemporada.value.trim();

  if (nome.length < 8) {
    await notificacao(
      "alerta",
      "O nome da temporada precisa ter pelo menos 8 caracteres.",
    );
    return;
  }

  if (!ano || ano.length !== 4 || isNaN(Number(ano))) {
    await notificacao("alerta", "Informe um ano válido (ex: 2026).");
    return;
  }

  const criada = await cadastrarTemporada(nome, ano);

  if (criada) {
    closeModal("overlayCriarTemporada");
    nomeTemporada.value = "";
    anoTemporada.value = "";

    if (window.atualizarDashboardVisaoGeral) {
      await window.atualizarDashboardVisaoGeral();
    } else if (window.listarTemporadas) {
      await window.listarTemporadas();
    }
  }
}
