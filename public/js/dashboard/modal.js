window.abrirModal = (modalId) => {
  let modal = document.getElementById(modalId);

  modal.style.display = "block";
};

window.closeModal = (modalId) => {
  let modal = document.getElementById(modalId);

  modal.style.display = "none";
};
