// --------------FETCH JSON ----------------

let productos = [];
fetch("../scripts/listado.json")
  .then((response) => {
    return response.json();
  })

  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      productos[i] = data[i];
    }
  });

// FUNCION CAMBIAR DE PRECIO DTO

const cambiarPrecioDto = (dto) => {
  productos.forEach((producto) => {
    if (producto.oferta == true) {
      producto.precio = producto.precio * ((100 - dto) / 100);
      producto.descripcion = producto.descripcion + " (" + dto + "% Off)";
    }
  });
};

setTimeout(() => {
  cambiarPrecioDto(10);
}, 1000);

// IMPRIMIR TODOS LOS PRODUCTOS EN OFERTA
function cardAHtml(arrayProd) {
  const contenedor = document.querySelector(".listadoProductosOferta");
  contenedor.innerHTML = "";

  //Busco los productos en oferta
  let array = arrayProd.filter((p) => p.oferta == true);

  for (let i = 0; i < array.length; i++) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
          <div class="container-img">
              <img src=${array[i].foto} alt=${array[i].descripcion} >
              </div>
              <h4>
                  ${array[i].descripcion}
              </h4>
              <h5>
                  ${array[i].marca}
              </h5>
              <H5>
                  ${array[i].presentacion}
              </h5>
              <h4>
                 $ ${array[i].precio}
              </h4>
              
              <button id=${array[i].id} onclick="agragarProductoACarrito(${array[i].id})" >
                Añadir
              </button>
          `;
    contenedor.appendChild(card);
  }
}

setTimeout(() => {
  cardAHtml(productos);
}, 1000);

// CARRITO
function obtenerCarrito() {
  let jsonCarrito = localStorage.getItem("carrito");
  let arrCarrito = JSON.parse(jsonCarrito);
  return arrCarrito;
}

function grabarCarrito(carritoDeCompra) {
  let jsonCarrito = JSON.stringify(carritoDeCompra);
  localStorage.setItem("carrito", jsonCarrito);
}

function agragarProductoACarrito(id) {
  let prod = productos.find((p) => p.id == id);
  agregarAlCarrito(prod);
}
function agregarAlCarrito(producto) {
  let arrCarrito = obtenerCarrito();
  if (arrCarrito == null) arrCarrito = [];
  if (!arrCarrito.some((p) => p.id == producto.id)) {
    Toastify({
      text:
        producto.descripcion +
        " " +
        producto.marca +
        " " +
        producto.presentacion +
        " AGREGADO AL CARRITO",
      className: "info",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
    arrCarrito.push(producto);
    grabarCarrito(arrCarrito);
  } else {
    Toastify({
      text:
        producto.descripcion +
        " " +
        producto.marca +
        " " +
        producto.presentacion +
        " AGREGADO AL CARRITO",
      className: "info",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();

    const indx = arrCarrito.findIndex((p) => p.id == producto.id);
    arrCarrito[indx].cant++;
    grabarCarrito(arrCarrito);
  }
}
