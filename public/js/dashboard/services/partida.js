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
const dataPartidaEditar = document.querySelector(
  "#overlayEditarPartida #iptDataPartida",
);
const adversarioPartidaEditar = document.querySelector(
  "#overlayEditarPartida #iptAdversarioPartida",
);
const qtdGolsPartidaEditar = document.querySelector(
  "#overlayEditarPartida #qtdGolsPartida",
);
const qtdAssistenciasPartidaEditar = document.querySelector(
  "#overlayEditarPartida #qtdAssistenciasPartida",
);

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

      if (window.exibirKpisTemporada) {
        await window.exibirKpisTemporada();
      }
      if (window.exibirDadosGrafico) {
        await window.exibirDadosGrafico();
      }
      if (window.exibirDadosTabelaPartida) {
        await window.exibirDadosTabelaPartida();
      }
    } else {
      const msgErro = await response.text();
      await notificacao("alerta", msgErro || "Erro ao criar partida.");
    }
  } catch (erro) {
    console.log(erro);
    await notificacao("alerta", "Erro ao criar partida.");
  }
}
