// CARRIITO
let carritoDeCompra = [];
localStorage.setItem;

function carritoAHtml() {
  let array = obtenerCarrito();
  const contenedor = document.querySelector(".listadoCarrito");
  contenedor.innerHTML = ''
  if (array === null) {
    let mensaje = document.getElementById(".listadoCarrito");
    mensaje.innerHTML = "Su carrito se encuentra vacio";
  } else {
    for (let i = 0; i < array.length; i++) {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
              <img src=${array[i].foto} alt=${array[i].descripcion} >
              <h4>
                  ${array[i].descripcion}
              <h4>
              <h5>
                  ${array[i].marca}
              <h5>
              <H5>
                  ${array[i].presentacion}
              <h5>
              <h4>
                 $ ${array[i].precio}
              <h4>
              <button id=${array[i].id} onclick="eliminarProductoDelCarrito(${array[i].id.toString()})">
                  Eliminar
              </button>
          `;
      contenedor.appendChild(card);
    }
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
  let prod = arrCarrito.find((p) => p.id == id)
  arrCarrito.splice(arrCarrito.indexOf(prod),1);
  grabarCarrito(arrCarrito);
  carritoAHtml();
}
