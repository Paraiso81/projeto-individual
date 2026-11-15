async function notificacao(tipo, msg) {
  console.log(tipo, msg);
  let divNotificacao = document.getElementById("notificacao");
  divNotificacao.classList.remove("alerta", "sucesso");
  divNotificacao.classList.add("container-notificacao");
  divNotificacao.style.display = "flex";

  console.log(divNotificacao);
  setTimeout(() => {
    divNotificacao.style.display = "none";
  }, 6000);

  if (tipo === "alerta") {
    divNotificacao.classList.add("alerta");
    return (divNotificacao.innerHTML = `
        <span class="icon-notificacao icon-alerta"
          ><i class="fa-solid fa-circle-exclamation"></i
        ></span>
        <p class="descricao-notificacao">${msg}</p>
        `);
  } else if (tipo === "sucesso") {
    divNotificacao.classList.add("sucesso");
    return (divNotificacao.innerHTML = `
        <span class="icon-notificacao icon-sucesso"
          ><i class="fa-solid fa-circle-check"></i
        ></span>
        <p class="descricao-notificacao">${msg}</p>
    `);
  }
}
