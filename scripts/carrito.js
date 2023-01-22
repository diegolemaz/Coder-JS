// CARRIITO
let carritoDeCompra = [];
localStorage.setItem;

function carritoAHtml() {
  let array = obtenerCarrito();

  const contenedor = document.querySelector(".listadoCarrito");
  contenedor.innerHTML = "";
  if (array.length == 0) {
    totalCarrito = 0;

    var mensaje = document.getElementById("carritoVacio");
    mensaje.innerHTML = "Su carrito se encuentra vacío!";
    mensaje.innerHTML = "Su carrito se encuentra vacío!";

    var botonEliminarCarrito = document.getElementById("boton-vaciar");
    botonEliminarCarrito.remove();

    var botonFinalizarCarrito = document.getElementById("boton-finalizar");
    botonFinalizarCarrito.remove();
    // var mensajeTotal = document.getElementById('totalCarrito');
    // mensajeTotal.remove();
  } else {
    for (let i = 0; i < array.length; i++) {
      const tabla = document.createElement("table");
      tabla.className = "table";
      tabla.innerHTML = ` 
              <tr>
              <td><img class="img-card" src=${array[i].foto} alt=${array[i].descripcion}</img></td>
              <td>${array[i].descripcion}</td>
              <td>${array[i].marca}</td>
              <td>${array[i].presentacion}</td>
              <td> $ ${array[i].precio}</td>
              <td> Cantidad: ${array[i].cant}</td>
              <td><button id {...array[i].id} onclick="eliminarProductoDelCarrito(${array[i].id.toString()})">Eliminar</button></td>
              <tr>
              `;
      contenedor.appendChild(tabla);
    }
    // const totalCarrito = carritoDeCompra.precio.reduce((acum, num) => acum + num, 0);
    //   var mensajeCarrito = document.getElementById('totalCarrito');
    //   mensajeCarrito.innerHTML = 'El total de su compra es $ '+totalCarrito;
  }
}
carritoAHtml();

function obtenerCarrito() {
  let jsonCarrito = localStorage.getItem("carrito");
  let arrCarrito = JSON.parse(jsonCarrito);
  return arrCarrito;
}

function grabarCarrito(carritoDeCompra) {
  let jsonCarrito = JSON.stringify(carritoDeCompra);
  localStorage.setItem("carrito", jsonCarrito);
}

function eliminarProductoDelCarrito(id) {
  let arrCarrito = obtenerCarrito();
  let prod = arrCarrito.find((p) => p.id == id);
  Toastify({
    text: " PRODUCTO ELIMINADO DEL CARRITO",
    className: "info",
    style: {
      background: "linear-gradient(to right, #f10f32, #db6678)",
    },
  }).showToast();
  arrCarrito.splice(arrCarrito.indexOf(prod), 1);

  grabarCarrito(arrCarrito);
  carritoAHtml(arrCarrito);
}

// FUNCION ELIMINAR TODOS LOS ELEMENTOS DEL CARRITO

const botonVaciarCarrito = document.querySelector("#boton-vaciar");
botonVaciarCarrito.addEventListener("click", () => {
  
  swal({
    icon:"warning",
    title: "Seguro que quiere eliminar todos los productos?", 
   buttons: ["Cancelar","Aceptar"]})
  .then((resp) => { 
   if (resp === true) {vaciarCarrito()}})
 
});

function vaciarCarrito() {
  let arrCarrito = obtenerCarrito();
  arrCarrito.length = 0;

  grabarCarrito(arrCarrito);
  carritoAHtml(arrCarrito);
}

// FINALIZAR COMPRA
const botonFinalizarCompra = document.querySelector("#boton-finalizar");
botonFinalizarCompra.addEventListener("click", () => {
  
  swal({
    icon:"success",
    title: "Gracias por tu compra", 
    text: "A la brevedad recibirá un mail para proceder con el pago.",
    button: "Ok"});
  vaciarCarrito();
});