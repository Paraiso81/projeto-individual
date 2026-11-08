async function notificao(tipo, msg) {
  console.log(tipo, msg);
  let notificao = document.getElementById("notificacao");
  notificao.classList.add("container-notificacao");
  notificao.style.display = "flex";

  console.log(notificao);
  setTimeout(() => {
    notificao.style.display = "none";
  }, 6000);

  if (tipo === "alerta") {
    notificao.classList.add("alerta");
    return (notificao.innerHTML = `
        <span class="icon-notificacao icon-alerta"
          ><i class="fa-solid fa-circle-exclamation"></i
        ></span>
        <p class="descricao-notificacao">${msg}</p>
        `);
  } else if (tipo === "sucesso") {
    notificao.classList.add("sucesso");
    return (notificao.innerHTML = `
        <span class="icon-notificacao icon-sucesso"
          ><i class="fa-solid fa-circle-check"></i
        ></span>
        <p class="descricao-notificacao">${msg}</p>
    `);
  }
}
