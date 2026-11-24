// Modal Criar Partida
const dataPartida = document.querySelector(
  "#overlayCriarPartida #iptDataPartida",
);
const adversarioPartida = document.querySelector(
  "#overlayCriarPartida #iptAdversarioPartida",
);
const qtdGolsPartida = document.querySelector(
  "#overlayCriarPartida #qtdGolsPartida",
);
const qtdAssistenciasPartida = document.querySelector(
  "#overlayCriarPartida #qtdAssistenciasPartida",
);

// Modal Editar Partida
const dataPartidaEditar = document.getElementById("iptDataPartidaEditar");
const adversarioPartidaEditar = document.getElementById(
  "iptAdversarioPartidaEditar",
);
const qtdGolsPartidaEditar = document.getElementById("qtdGolsPartidaEditar");
const qtdAssistenciasPartidaEditar = document.getElementById(
  "qtdAssistenciasPartidaEditar",
);

// Modal Deletar Partida
const textoPartidaDeletar = document.getElementById("textoPartidaDeletar");
const textoTemporadaDeletar = document.getElementById("textoTemporadaDeletar");

let partidaIdEdicao = null;
let partidaIdExclusao = null;

async function atualizarDadosTelaPartidas() {
  if (window.exibirKpisTemporada) {
    await window.exibirKpisTemporada();
  }
  if (window.exibirDadosGrafico) {
    await window.exibirDadosGrafico();
  }
  if (window.exibirMelhorPartida) {
    await window.exibirMelhorPartida();
  }
  if (window.exibirDadosTabelaPartida) {
    await window.exibirDadosTabelaPartida();
  }
}

async function defaultValoresDate(inputId) {
  const dadosTemporada = await buscarTemporada();

  if (!dadosTemporada || !dadosTemporada[0]) {
    return;
  }

  let dataMax = `${dadosTemporada[0].ano}-12-31`;
  let dataMin = `${dadosTemporada[0].ano}-01-01`;

  inputId.min = dataMin;
  inputId.max = dataMax;
}

async function validarDadosPartida(
  dt_partida,
  adversario,
  gols,
  assistencias,
  idUsuario,
  idTemporada,
) {
  if (!idUsuario || !idTemporada) {
    await notificacao("alerta", "Temporada ou usuário inválido.");
    return false;
  }

  if (!dt_partida) {
    await notificacao("alerta", "Selecione a data da partida.");
    return false;
  }

  if (!adversario || adversario.trim().length <= 3) {
    await notificacao(
      "alerta",
      "O nome do adversário precisa ter pelo menos 4 caracteres.",
    );
    return false;
  }

  if (Number(gols) < 0) {
    await notificacao("alerta", "Os gols não podem ser negativos.");
    return false;
  }

  if (Number(assistencias) < 0) {
    await notificacao("alerta", "As assistências não podem ser negativas.");
    return false;
  }

  return true;
}

async function abrirModalCriarPartida() {
  await defaultValoresDate(dataPartida);
  abrirModal("overlayCriarPartida");
}

async function salvarNovaPartida() {
  const idUsuario = sessionStorage.getItem("ID_USUARIO");
  const dt_partida = dataPartida.value;
  const adversario = adversarioPartida.value;
  const gols = Number(qtdGolsPartida.innerText);
  const assistencias = Number(qtdAssistenciasPartida.innerText);

  const ehValido = await validarDadosPartida(
    dt_partida,
    adversario,
    gols,
    assistencias,
    idUsuario,
    temporadaId,
  );

  if (!ehValido) {
    return;
  }

  const criada = await cadastrarPartida(
    temporadaId,
    dt_partida,
    adversario,
    gols,
    assistencias,
  );

  if (criada) {
    closeModal("overlayCriarPartida");
    dataPartida.value = "";
    adversarioPartida.value = "";
    qtdGolsPartida.innerText = "0";
    qtdAssistenciasPartida.innerText = "0";

    await atualizarDadosTelaPartidas();
  }
}

async function abrirModalEditarPartida(partidaId) {
  const idUsuario = sessionStorage.getItem("ID_USUARIO");

  if (!idUsuario || !temporadaId || !partidaId) {
    await notificacao("alerta", "Não foi possível identificar a partida.");
    return;
  }

  const partida = await buscarPartida(temporadaId, partidaId);
  if (!partida) {
    return;
  }

  await defaultValoresDate(dataPartidaEditar);

  partidaIdEdicao = partidaId;
  dataPartidaEditar.value = formatarData("input", partida.dt_partida);
  adversarioPartidaEditar.value = partida.adversario;
  qtdGolsPartidaEditar.innerText = partida.gols;
  qtdAssistenciasPartidaEditar.innerText = partida.assistencias;

  abrirModal("overlayEditarPartida");
}

async function salvarEdicaoPartida() {
  const idUsuario = sessionStorage.getItem("ID_USUARIO");
  const dt_partida = dataPartidaEditar.value;
  const adversario = adversarioPartidaEditar.value;
  const gols = Number(qtdGolsPartidaEditar.innerText);
  const assistencias = Number(qtdAssistenciasPartidaEditar.innerText);

  if (!partidaIdEdicao) {
    await notificacao("alerta", "Nenhuma partida selecionada para edição.");
    return;
  }

  const ehValido = await validarDadosPartida(
    dt_partida,
    adversario,
    gols,
    assistencias,
    idUsuario,
    temporadaId,
  );

  if (!ehValido) {
    return;
  }

  const partidaAtualizada = await atualizarPartida(
    temporadaId,
    partidaIdEdicao,
    {
      dt_partida: dt_partida,
      adversario: adversario,
      gols: gols,
      assistencias: assistencias,
    },
  );

  if (partidaAtualizada) {
    closeModal("overlayEditarPartida");
    partidaIdEdicao = null;
    await atualizarDadosTelaPartidas();
  }
}

async function abrirModalDeletarPartida(partidaId) {
  const idUsuario = sessionStorage.getItem("ID_USUARIO");

  if (!idUsuario || !temporadaId || !partidaId) {
    await notificacao("alerta", "Não foi possível identificar a partida.");
    return;
  }

  const partida = await buscarPartida(temporadaId, partidaId);
  if (!partida) {
    return;
  }

  partidaIdExclusao = partidaId;

  const textoGol = partida.gols === 1 ? "gol" : "gols";
  const textoAssist =
    partida.assistencias === 1 ? "assistência" : "assistências";

  textoPartidaDeletar.innerText = `${partida.adversario} (${formatarData("default", partida.dt_partida)}) - ${partida.gols} ${textoGol} e ${partida.assistencias} ${textoAssist}?`;
  textoTemporadaDeletar.innerText = `Os números deste jogo serão descontados de ${partida.nome}.`;

  abrirModal("overlayDeletarPartida");
}

async function confirmarExclusaoPartida() {
  const idUsuario = sessionStorage.getItem("ID_USUARIO");

  if (!idUsuario || !temporadaId || !partidaIdExclusao) {
    await notificacao("alerta", "Nenhuma partida selecionada para exclusão.");
    return;
  }

  const excluida = await deletarPartida(temporadaId, partidaIdExclusao);

  if (excluida) {
    closeModal("overlayDeletarPartida");
    partidaIdExclusao = null;
    await atualizarDadosTelaPartidas();
  }
}
