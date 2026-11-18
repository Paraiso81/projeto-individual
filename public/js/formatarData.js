function formatarData(tipo, data) {
  const dataFormatada = new Date(data);

  if (tipo === "input") {
    return dataFormatada.toISOString().slice(0, 10);
  }

  let opcoes = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  if (tipo === "long") {
    opcoes = {
      day: "2-digit",
      month: "long",
      year: "numeric",
    };
  } else if (tipo === "short") {
    opcoes = {
      day: "2-digit",
      month: "2-digit",
    };
  }

  const formatter = new Intl.DateTimeFormat("pt-BR", opcoes);
  return formatter.format(dataFormatada);
}
