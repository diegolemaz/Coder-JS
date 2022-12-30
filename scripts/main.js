// MODO OSCURO
const botonModoOscuro = document.querySelector("#boton-modo");
const body = document.body;
let vModoOscuro = localStorage.getItem("modo-oscuro");

function activarModoOscuro() {
  body.classList.add("modo-oscuro");
  localStorage.setItem("modo-oscuro", "activado");
}

function desactivarModoOscuro() {
  body.classList.remove("modo-oscuro");
  localStorage.setItem("modo-oscuro", "desactivado");
}

if (vModoOscuro === "activado") {
  activarModoOscuro();
} else {
  desactivarModoOscuro();
}

botonModoOscuro.addEventListener("click", () => {
  vModoOscuro = localStorage.getItem("modo-oscuro");

  if (vModoOscuro === "activado") {
    desactivarModoOscuro();
  } else {
    activarModoOscuro();
  }
});
