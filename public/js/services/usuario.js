function limparSessaoUsuario() {
  sessionStorage.removeItem("ID_USUARIO");
  sessionStorage.removeItem("NOME");
  sessionStorage.removeItem("EMAIL");
}

async function cadastrarUsuario(nome, email, senha) {
  try {
    const response = await fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nome,
        email: email,
        senha: senha,
      }),
    });

    if (response.ok) {
      await notificacao("sucesso", "Conta criada com sucesso.");
      return true;
    } else {
      const msgErro = await response.text();
      await notificacao("alerta", msgErro || "Erro ao criar a conta.");
      return false;
    }
  } catch (erro) {
    console.log(erro);
    await notificacao("alerta", "Erro ao criar a conta.");
    return false;
  }
}

async function loginUsuario(email, senha) {
  try {
    const response = await fetch("/usuarios/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        senha: senha,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      sessionStorage.setItem("ID_USUARIO", data.id);
      sessionStorage.setItem("NOME", data.nome);
      sessionStorage.setItem("EMAIL", data.email);

      await notificacao("sucesso", "Login efetuado com sucesso.");
      return data;
    } else {
      const msgErro = await response.text();
      await notificacao("alerta", msgErro || "Erro ao fazer login.");
      return null;
    }
  } catch (erro) {
    console.log(erro);
    await notificacao("alerta", "Erro ao fazer login.");
    return null;
  }
}

async function atualizarUsuario(dados) {
  const usuarioId = sessionStorage.getItem("ID_USUARIO");

  if (!usuarioId) {
    await notificacao("alerta", "Não foi possível identificar o usuário.");
    return null;
  }

  try {
    const response = await fetch(`/usuarios/${usuarioId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.nome !== undefined) {
        sessionStorage.setItem("NOME", data.nome);
      }
      if (data.email !== undefined) {
        sessionStorage.setItem("EMAIL", data.email);
      }

      await notificacao("sucesso", "Perfil atualizado com sucesso.");
      return data;
    } else {
      const msgErro = await response.text();
      await notificacao("alerta", msgErro || "Erro ao atualizar usuário.");
      return null;
    }
  } catch (erro) {
    console.log(erro);
    await notificacao("alerta", "Erro ao atualizar usuário.");
    return null;
  }
}

async function deletarUsuario() {
  const usuarioId = sessionStorage.getItem("ID_USUARIO");

  if (!usuarioId) {
    await notificacao("alerta", "Não foi possível identificar o usuário.");
    return false;
  }

  try {
    const response = await fetch(`/usuarios/${usuarioId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      limparSessaoUsuario();
      await notificacao("sucesso", "Conta excluída com sucesso.");
      return true;
    } else {
      const msgErro = await response.text();
      await notificacao("alerta", msgErro || "Erro ao excluir conta.");
      return false;
    }
  } catch (erro) {
    console.log(erro);
    await notificacao("alerta", "Erro ao excluir conta.");
    return false;
  }
}

async function logout() {
  await notificacao("sucesso", "Saindo da conta.");
  limparSessaoUsuario();

  setTimeout(() => {
    window.location.href = "../index.html";
  }, 3000);
}
