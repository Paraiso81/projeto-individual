const nomeTemporada = document.getElementById("iptNomeTemporada");
const anoTemporada = document.getElementById("iptAnoTemporada");

async function criarTemporada() {
  const idUsuario = sessionStorage.getItem("ID_USUARIO");
  const nome = nomeTemporada.value;
  const ano = anoTemporada.value;

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
      closeModal("overlayCriarTemporada");

      if (window.atualizarDashboardVisaoGeral) {
        await window.atualizarDashboardVisaoGeral();
      } else if (window.listarTemporadas) {
        await window.listarTemporadas();
      }
    } else {
      const msgErro = await response.text();
      await notificacao("alerta", msgErro || "Erro ao criar temporada.");
    }
  } catch (erro) {
    console.log(erro);
    await notificacao("alerta", "Erro ao criar temporada.");
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

// https://developer.mozilla.org/pt-BR/docs/Web/API/URLSearchParams

const params = new URLSearchParams(window.location.search);
const temporadaId = params.get("id");

async function buscarTemporada() {
  const usuarioId = sessionStorage.getItem("ID_USUARIO");

  if (temporadaId === undefined || temporadaId === null) {
    return notificacao("alerta", "Erro ao identificar temporada.");
  }

  try {
    const response = await fetch(`/temporadas/${usuarioId}/${temporadaId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    console.log(data);
    return data || [];
  } catch (erro) {
    console.log(erro);
    await notificacao("alerta", "Houve um problema ao carregar os dados.");
    return [];
  }
}

async function abrirModalEditarTemporada() {
  const dadosTemporada = await buscarTemporada();
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
  const usuarioId = sessionStorage.getItem("ID_USUARIO");
  const nome = nomeTemporada.value.trim();
  const ano = anoTemporada.value.trim();

  if (!usuarioId || !temporadaId) {
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

  if (!ano || ano.length !== 4) {
    await notificacao("alerta", "Informe um ano válido (ex: 2026).");
    return;
  }

  try {
    const response = await fetch(`/temporadas/${usuarioId}/${temporadaId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nome,
        ano: ano,
      }),
    });

    if (response.ok) {
      closeModal("overlayEditarTemporada");
      await notificacao("sucesso", "Temporada atualizada com sucesso.");

      if (window.exibirDadosHeader) {
        await window.exibirDadosHeader();
      }
      if (window.listarTemporadas) {
        await window.listarTemporadas();
      }
    } else {
      const msgErro = await response.text();
      await notificacao("alerta", msgErro || "Erro ao atualizar temporada.");
    }
  } catch (erro) {
    console.log(erro);
    await notificacao("alerta", "Erro ao atualizar temporada.");
  }
}
