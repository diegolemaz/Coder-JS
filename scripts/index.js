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

// SWAL BIENVENIDA
swal({
  title: "Bienvenid@!",
  text: "Sitio para mayores de 18 años",
  button: "Soy mayor",
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
function cardAHtmlOferta(arrayProd) {
  const contenedor = document.querySelector(".listadoProductosOferta");
  contenedor.innerHTML = "";
  let array = arrayProd.filter((p) => p.oferta == true);
  for (let i = 0; i < array.length; i++) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
          <div class="container-img">
              <img class="img-card" src=${array[i].foto} alt=${array[i].descripcion} >
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
              
              <button id=${array[i].id} onclick="agragarProductoACarrito('${array[i].id}')" >
                Añadir
              </button>
          `;
    contenedor.appendChild(card);
  }
}

setTimeout(() => {
  cardAHtmlOferta(productos);
}, 1000);

// OBTENER CARRITO DEL LS
function obtenerCarrito() {
  let jsonCarrito = localStorage.getItem("carrito");
  let arrCarrito = JSON.parse(jsonCarrito);
  return arrCarrito;
}

//GUARDAR CARITO EN EL LS
function grabarCarrito(carritoDeCompra) {
  let jsonCarrito = JSON.stringify(carritoDeCompra);
  localStorage.setItem("carrito", jsonCarrito);
}

// AGREGAR PRODUCTO AL CARRITO
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

// CARROUSEL CON FOTOS
var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  effect: "fade",
  centeredSlides: true,
  autoplay: {
    delay: 1500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: false,
  },
});
