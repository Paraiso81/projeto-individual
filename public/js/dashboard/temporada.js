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

async function buscarTemporada() {
  const temporadaId = params.get("id");

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
    return data || [];
  } catch (error) {
    console.log(erro);
    await notificacao("alerta", "Houve um problema ao carregar os dados.");
    return [];
  }
}
