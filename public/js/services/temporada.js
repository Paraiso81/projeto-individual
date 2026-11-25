async function cadastrarTemporada(nome, ano) {
  const idUsuario = sessionStorage.getItem("ID_USUARIO");

  if (!idUsuario) {
    await notificacao("alerta", "Não foi possível identificar o usuário.");
    return false;
  }

  try {
    const response = await fetch("/temporadas/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuarioId: idUsuario,
        nome: nome,
        ano: ano,
      }),
    });

    if (response.ok) {
      await notificacao("sucesso", "Temporada criada com sucesso.");
      return true;
    } else {
      const msgErro = await response.text();
      await notificacao("alerta", msgErro || "Erro ao criar temporada.");
      return false;
    }
  } catch (erro) {
    console.log(erro);
    await notificacao("alerta", "Erro ao criar temporada.");
    return false;
  }
}

async function buscarTodasTemporadas() {
  const idUsuario = sessionStorage.getItem("ID_USUARIO");

  if (!idUsuario) {
    return [];
  }

  try {
    const response = await fetch(`/temporadas/usuario/${idUsuario}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data || [];
  } catch (erro) {
    console.log(erro);
    await notificacao("alerta", "Houve um problema ao carregar os dados.");
    return [];
  }
}

async function buscarTemporada(id) {
  const usuarioId = sessionStorage.getItem("ID_USUARIO");
  const idTemporada =
    id || new URLSearchParams(window.location.search).get("id");

  if (!usuarioId || !idTemporada) {
    await notificacao("alerta", "Erro ao identificar temporada.");
    return [];
  }

  try {
    const response = await fetch(`/temporadas/${usuarioId}/${idTemporada}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data || [];
  } catch (erro) {
    console.log(erro);
    await notificacao("alerta", "Houve um problema ao carregar os dados.");
    return [];
  }
}

async function atualizarTemporada(temporadaId, dados) {
  const usuarioId = sessionStorage.getItem("ID_USUARIO");

  if (!usuarioId || !temporadaId) {
    await notificacao("alerta", "Não foi possível identificar a temporada.");
    return null;
  }

  try {
    const response = await fetch(`/temporadas/${usuarioId}/${temporadaId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    if (response.ok) {
      const data = await response.json();
      await notificacao("sucesso", "Temporada atualizada com sucesso.");
      return data;
    } else {
      const msgErro = await response.text();
      await notificacao("alerta", msgErro || "Erro ao atualizar temporada.");
      return null;
    }
  } catch (erro) {
    console.log(erro);
    await notificacao("alerta", "Erro ao atualizar temporada.");
    return null;
  }
}
