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
  if (window.exibirDadosTabelaPartida) {
    await window.exibirDadosTabelaPartida();
  }
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

async function criarPartida() {
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

  try {
    const response = await fetch("/partidas/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuarioId: idUsuario,
        temporadaId: temporadaId,
        dt_partida: dt_partida,
        adversario: adversario,
        gols: gols,
        assistencias: assistencias,
      }),
    });

    if (response.ok) {
      closeModal("overlayCriarPartida");
      await notificacao("sucesso", "Partida criada com sucesso.");

      dataPartida.value = "";
      adversarioPartida.value = "";
      qtdGolsPartida.innerText = "0";
      qtdAssistenciasPartida.innerText = "0";

      await atualizarDadosTelaPartidas();
    } else {
      const msgErro = await response.text();
      await notificacao("alerta", msgErro || "Erro ao criar partida.");
    }
  } catch (erro) {
    console.log(erro);
    await notificacao("alerta", "Erro ao criar partida.");
  }
}

async function buscarDadosPartida(partidaId) {
  const idUsuario = sessionStorage.getItem("ID_USUARIO");

  if (!idUsuario || !temporadaId || !partidaId) {
    await notificacao("alerta", "Não foi possível identificar a partida.");
    return null;
  }

  try {
    const response = await fetch(
      `/partidas/${idUsuario}/${temporadaId}/${partidaId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      const msgErro = await response.text();
      await notificacao(
        "alerta",
        msgErro || "Erro ao buscar dados da partida.",
      );
      return null;
    }

    const dados = await response.json();
    const partida = dados[0];

    if (!partida) {
      await notificacao("alerta", "Partida não encontrada.");
      return null;
    }

    return partida;
  } catch (erro) {
    console.log(erro);
    await notificacao("alerta", "Erro ao carregar partida.");
    return null;
  }
}

async function abrirModalEditarPartida(partidaId) {
  const partida = await buscarDadosPartida(partidaId);
  if (!partida) {
    return;
  }

  partidaIdEdicao = partidaId;
  dataPartidaEditar.value = formatarData("input", partida.dt_partida);
  adversarioPartidaEditar.value = partida.adversario;
  qtdGolsPartidaEditar.innerText = partida.gols;
  qtdAssistenciasPartidaEditar.innerText = partida.assistencias;

  abrirModal("overlayEditarPartida");
}

async function editarPartida() {
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

  try {
    const response = await fetch(
      `/partidas/${idUsuario}/${temporadaId}/${partidaIdEdicao}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dt_partida: dt_partida,
          adversario: adversario,
          gols: gols,
          assistencias: assistencias,
        }),
      },
    );

    if (response.ok) {
      closeModal("overlayEditarPartida");
      partidaIdEdicao = null;
      await notificacao("sucesso", "Partida atualizada com sucesso.");
      await atualizarDadosTelaPartidas();
    } else {
      const msgErro = await response.text();
      await notificacao("alerta", msgErro || "Erro ao atualizar partida.");
    }
  } catch (erro) {
    console.log(erro);
    await notificacao("alerta", "Erro ao atualizar partida.");
  }
}

async function abrirModalDeletarPartida(partidaId) {
  const partida = await buscarDadosPartida(partidaId);
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

async function deletarPartida() {
  const idUsuario = sessionStorage.getItem("ID_USUARIO");

  if (!idUsuario || !temporadaId || !partidaIdExclusao) {
    await notificacao("alerta", "Nenhuma partida selecionada para exclusão.");
    return;
  }

  try {
    const response = await fetch(
      `/partidas/${idUsuario}/${temporadaId}/${partidaIdExclusao}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.ok) {
      closeModal("overlayDeletarPartida");
      partidaIdExclusao = null;
      await notificacao("sucesso", "Partida excluída com sucesso.");
      await atualizarDadosTelaPartidas();
    } else {
      const msgErro = await response.text();
      await notificacao("alerta", msgErro || "Erro ao excluir partida.");
    }
  } catch (erro) {
    console.log(erro);
    await notificacao("alerta", "Erro ao excluir partida.");
  }
}
