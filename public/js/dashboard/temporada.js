const nomeTemporada = document.getElementById("iptNomeTemporada");
const anoTemporada = document.getElementById("iptAnoTemporada");

async function criarTemporada() {
  let nome = nomeTemporada.value;
  let ano = anoTemporada.value;
  const response = await fetch("/temporadas/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      usuarioId: usuarioId,
      nome: nome,
      ano: ano,
    }),
  })
    .then(async function (response) {
      console.log(response, "response");
      if (response.ok) {
        await notificacao("sucesso", "Temporada criada com sucesso.");
        closeModal("overlayCriarTemporada");
        listarTemporadas();
      } else {
        const msgErro = await response.text();
        await notificacao("alerta", msgErro || "Erro ao criar temporada.");
      }
    })
    .catch(async function (erro) {
      console.log(erro);
      return notificacao("alerta", "Erro ao criar temporada.");
    });

  console.log(response, "respotas da api");
}

async function buscarTemporadas() {
  const idUsuario = sessionStorage.getItem("ID_USUARIO");

  const data = await fetch(`/temporadas/usuario/${idUsuario}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .catch(async function (erro) {
      console.log(erro);
      await notificacao("alerta", "Houve um problema ao carregar os dados.");
    });

  if (data !== undefined) {
    sessionStorage.setItem("TODAS_TEMPORADAS", JSON.stringify(data));
  } else {
    sessionStorage.removeItem("TODAS_TEMPORADAS");
  }
}
