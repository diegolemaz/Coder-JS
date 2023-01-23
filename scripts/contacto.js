// FORMULARIO DE CONTACTO
const formularioContactos = document.querySelector("#form-contactos");
const inputNombre = document.querySelector("#input-nombre");
const inputEmail = document.querySelector("#input-email");
const inputTel = document.querySelector("#input-tel");
const inputMensaje = document.querySelector("#input-mensaje");

formularioContactos.onsubmit = (e) => {
  e.preventDefault();

  // FETCH A MOCKAPI
  fetch("https://63cc70729b72d2a88e0d2203.mockapi.io/api/datosContacto", {
    method: "POST",
    body: JSON.stringify({
      nombre: inputNombre.value,
      email: inputEmail.value,
      tel: inputTel.value,
      mensaje: inputMensaje.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      formularioContactos.addEventListener("submit", function () {
        formularioContactos.reset();
        swal({
          icon: "success",
          title: "Gracias por tu contacto!",
          text: "A la brevedad te estaremos respondiendo.",
          button: "Ok",
        });
      });
    });
};
