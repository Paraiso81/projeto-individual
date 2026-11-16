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
