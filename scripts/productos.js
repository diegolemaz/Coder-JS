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
function cambiarPrecioDto(dto) {
  productos.forEach((producto) => {
    if (producto.oferta == true) {
      producto.precio = producto.precio * ((100 - dto) / 100);
      producto.descripcion = producto.descripcion + " (" + dto + "% Off)";
    }
  });
}
setTimeout(() => {
  cambiarPrecioDto(10);
}, 1000);

// IMPRIMIR TODOS LOS PRODUCTOS
function cardAHtml(array) {
  const contenedor = document.querySelector(".listadoProductos");
  contenedor.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <div class="container-img">
            <img class="img-card" src=${array[i].foto} alt=${array[i].descripcion} >
            </div>
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
            
            <button id=${array[i].id} onclick="agragarProductoACarrito('${array[i].id}')" >
                Añadir
            </button>
        `;
    contenedor.appendChild(card);
  }
}
setTimeout(() => {
  cardAHtml(productos);
}, 1000);

// FUNCION ORDENAR ARAY DESCRIPCION A-Z
const botonOrdenarProductos = document.querySelector("#boton-ordenar");
const ordenarListadoDesc = (prod1, prod2) => {
  if (prod1.descripcion > prod2.descripcion) {
    return 1;
  }
  if (prod1.descripcion < prod2.descripcion) {
    return -1;
  }
  if ((prod1.descripcion = prod2.descripcion)) {
    return 0;
  }
};

setTimeout(() => {
  let listadoOrdenado = productos.slice();
  listadoOrdenado.sort(ordenarListadoDesc);
  botonOrdenarProductos.addEventListener("click", () => {
    cardAHtml(listadoOrdenado);
  });
}, 1000);

// FUNCION ORDENAR ARAY DESCRIPCION Z-A
const botonOrdenarProductos2 = document.querySelector("#boton-ordenar2");
const ordenarListadoDesc2 = (prod1, prod2) => {
  if (prod1.descripcion > prod2.descripcion) {
    return -1;
  }
  if (prod1.descripcion < prod2.descripcion) {
    return 1;
  }
  if ((prod1.descripcion = prod2.descripcion)) {
    return 0;
  }
};
setTimeout(() => {
  let listadoOrdenado2 = productos.slice();
  listadoOrdenado2.sort(ordenarListadoDesc2);
  botonOrdenarProductos2.addEventListener("click", () =>
    cardAHtml(listadoOrdenado2)
  );
}, 1000);

// MOSTRAR SOLO PRODUCTOS EN OFERTAS
const botonProductosOferta = document.querySelector("#boton-ofertas");
const mostrarProductosOferta = (producto) => {
  return producto.oferta == true;
};
setTimeout(() => {
  let productosFiltradosOferta = productos.filter(mostrarProductosOferta);
  botonProductosOferta.addEventListener("click", () => {
    cardAHtml(productosFiltradosOferta);
  });
}, 1000);

// BUSCAR Y MOSTRAR PRODUCTOS
let encontrado = [];
const formBusqueda = document.querySelector("#form-busqueda");
const inputBusqueda = document.querySelector("#input-busqueda");

formBusqueda.addEventListener("submit", (e) => {
  e.preventDefault();
  encontrado = productos.filter((el) => {
    let desc = el.descripcion.toLowerCase();
    return desc.indexOf(inputBusqueda.value.toLowerCase()) >= 0;
  });

  if (encontrado.length == 0) {
    busqueda.innerHTML = `No se han encontrado productos con ${inputBusqueda.value}`;
  } else {
    busqueda.innerHTML = `Resultados de: ${inputBusqueda.value}`;
  }
  cardAHtml(encontrado);
});
formBusqueda.reset();

// MOSTRAR CARRITO Y DETALLES
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
