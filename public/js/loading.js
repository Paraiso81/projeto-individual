let textoOriginal = "";

function buttonLoading(elementoButton, isLoading) {
  elementoButton.disabled = isLoading;
  if (isLoading) {
    textoOriginal = elementoButton.innerHTML;
    elementoButton.innerHTML = `<span class='loading'></span>`;
  } else {
    elementoButton.innerHTML = textoOriginal;
  }
}
