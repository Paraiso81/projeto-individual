const params = new URLSearchParams(window.location.search);
const temporadaId = params.get("id");

const nomeTemporada = document.getElementById("iptNomeTemporada");
const anoTemporada = document.getElementById("iptAnoTemporada");

async function abrirModalEditarTemporada() {
  const dadosTemporada = await buscarTemporada(temporadaId);
  const temporada = dadosTemporada[0];

  if (!temporada) {
    await notificacao("alerta", "Temporada não encontrada.");
    return;
  }

  nomeTemporada.value = temporada.nome;
  anoTemporada.value = temporada.ano;

  abrirModal("overlayEditarTemporada");
}

async function editarTemporada() {
  const nome = nomeTemporada.value.trim();
  const ano = anoTemporada.value.trim();

  if (!temporadaId) {
    await notificacao("alerta", "Não foi possível identificar a temporada.");
    return;
  }

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

  const atualizada = await atualizarTemporada(temporadaId, {
    nome: nome,
    ano: ano,
  });

  if (atualizada) {
    closeModal("overlayEditarTemporada");

    if (window.exibirDadosHeader) {
      await window.exibirDadosHeader();
    }
    if (window.listarTemporadas) {
      await window.listarTemporadas();
    }
  }
}
