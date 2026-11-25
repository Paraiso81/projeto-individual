async function cadastrarPartida(
  temporadaId,
  dt_partida,
  adversario,
  gols,
  assistencias,
) {
  const idUsuario = sessionStorage.getItem("ID_USUARIO");

  if (!idUsuario || !temporadaId) {
    await notificacao("alerta", "Temporada ou usuário inválido.");
    return false;
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
      await notificacao("sucesso", "Partida criada com sucesso.");
      return true;
    } else {
      const msgErro = await response.text();
      await notificacao("alerta", msgErro || "Erro ao criar partida.");
      return false;
    }
  } catch (erro) {
    console.log(erro);
    await notificacao("alerta", "Erro ao criar partida.");
    return false;
  }
}

async function buscarPartida(temporadaId, partidaId) {
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

async function atualizarPartida(temporadaId, partidaId, dados) {
  const idUsuario = sessionStorage.getItem("ID_USUARIO");

  if (!idUsuario || !temporadaId || !partidaId) {
    await notificacao("alerta", "Não foi possível identificar a partida.");
    return null;
  }

  try {
    const response = await fetch(
      `/partidas/${idUsuario}/${temporadaId}/${partidaId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      },
    );

    if (response.ok) {
      const data = await response.json();
      await notificacao("sucesso", "Partida atualizada com sucesso.");
      return data;
    } else {
      const msgErro = await response.text();
      await notificacao("alerta", msgErro || "Erro ao atualizar partida.");
      return null;
    }
  } catch (erro) {
    console.log(erro);
    await notificacao("alerta", "Erro ao atualizar partida.");
    return null;
  }
}

async function deletarPartida(temporadaId, partidaId) {
  const idUsuario = sessionStorage.getItem("ID_USUARIO");

  if (!idUsuario || !temporadaId || !partidaId) {
    await notificacao("alerta", "Nenhuma partida selecionada para exclusão.");
    return false;
  }

  try {
    const response = await fetch(
      `/partidas/${idUsuario}/${temporadaId}/${partidaId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.ok) {
      await notificacao("sucesso", "Partida excluída com sucesso.");
      return true;
    } else {
      const msgErro = await response.text();
      await notificacao("alerta", msgErro || "Erro ao excluir partida.");
      return false;
    }
  } catch (erro) {
    console.log(erro);
    await notificacao("alerta", "Erro ao excluir partida.");
    return false;
  }
}
