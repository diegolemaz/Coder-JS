class Producto {
    constructor(
      id,
      descripcion,
      marca,
      presentacion,
      categoria,
      precio,
      oferta,
      foto,
      fechaVto
    ) {
      this.id = id;
      this.descripcion = descripcion.toUpperCase();
      this.marca = marca.toUpperCase();
      this.presentacion = presentacion.toUpperCase();
      this.categoria = categoria.toUpperCase();
      this.precio = precio;
      this.oferta = oferta;
      this.foto = foto;
      this.fechaVto = new Date(fechaVto);
    }
  }
  
  const productos = [];
  productos.push(
    new Producto(
      "001",
      "Cerveza",
      "Budwisser",
      "355 ml",
      "Cervezas",
      "45",
      true,
      "./assets/image/001.png"
    )
  );
  productos.push(
    new Producto(
      "002",
      "Cerveza",
      "Corona",
      "355 ml",
      "Cervezas",
      "55",
      false,
      "./assets/image/002.png"
    )
  );
  productos.push(
    new Producto(
      "003",
      "Cerveza",
      "Coronita",
      "210 ml",
      "Cervezas",
      "30",
      false,
      "./assets/image/003.png"
    )
  );
  productos.push(
    new Producto(
      "004",
      "Cerveza Ipa",
      "Goose Island",
      "473 ml",
      "Cervezas",
      "49",
      false,
      "./assets/image/004.png"
    )
  );
  productos.push(
    new Producto("005", "Cerveza", "Patricia", "473 ml", "Cervezas", "49", true, "./assets/image/005.png")
  );
  productos.push(
    new Producto(
      "006",
      "Cerveza",
      "Patricia",
      "(Env. ret.) 340 ml",
      "Cervezas",
      "25",
      true,
      "./assets/image/006.png"
    )
  );
  productos.push(
    new Producto("007", "Cerveza", "Zillertal", "473 ml", "Cervezas", "53", false, "./assets/image/007.png")
  );
  productos.push(
    new Producto(
      "008",
      "Aperitivo",
      "Campari",
      "750 ml",
      "Aperitivos",
      "600",
      true,
      "./assets/image/008.png"    
    )
  );
  productos.push(
    new Producto(
      "009",
      "Gin tonic",
      "Dr Lemon",
      "lata 310 ml",
      "Tragos",
      "150",
      true,
      "./assets/image/009.png"
    )
  );
  productos.push(
    new Producto("010", "Fernet", "Branca", "750 ml", "Aperitivos", "300", true, "./assets/image/010.png")
  );
  productos.push(
    new Producto("011", "Gin", "Alquimista", "500 ml", "Blancas", "600", false, "./assets/image/011.png")
  );
  productos.push(
    new Producto("012", "Gin", "Gordons", "500 ml", "Blancas", "600", false, "./assets/image/012.png")
  );
  productos.push(
    new Producto("013", "Gin", "Tanqueray", "750 ml", "Blancas", "600", false, "./assets/image/013.png")
  );
  productos.push(
    new Producto(
      "014",
      "Licor",
      "Jagermeifter",
      "700 ml",
      "Licores",
      "600",
      false, ".//assets/image/014.png"
    )
  );
  productos.push(
    new Producto(
      "015",
      "Ron Añejo Especial",
      "Havana",
      "750 ml",
      "Blancas",
      "800",
      false, "./assets/image/015.png"
    )
  );
  productos.push(
    new Producto("016", "Vodka", "Smirnoff", "750 ml", "Blancas", "600", true, "./assets/image/016.png")
  );


  // IMPRIMIR TODOS LOS PRODUCTOS EN OFERTA
function cardAHtml(arrayProd) {
    const contenedor = document.querySelector(".listadoProductosOferta");
    contenedor.innerHTML = ''

    //Busco los productos en oferta
    let array = arrayProd.filter((p) => p.oferta == true)

    for (let i = 0; i < array.length; i++) {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
          <div class="container-img">
              <img src=${array[i].foto} alt=${array[i].descripcion} >
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
              
              <button id=${array[i].id} onclick="agragarProductoACarrito(${array[i].id})" >
                Añadir
              </button>
          `;
      contenedor.appendChild(card);
    }
  }
  
  cardAHtml(productos);

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
    let prod = productos.find((p) => p.id == id)
    agregarAlCarrito(prod);
  }
  function agregarAlCarrito (producto) {
      let arrCarrito = obtenerCarrito();
      if (arrCarrito == null) 
        arrCarrito = [];
  
      if (!arrCarrito.some((p) => p.id == producto.id)) {
          arrCarrito.push(producto);
          grabarCarrito(arrCarrito);
          alert('Producto añadido correctamente')
      } 
  }