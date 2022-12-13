class Producto {
  constructor(id, descripcion, marca, presentacion, categoria, precio, oferta, fechaVto) {
      this.id = id;
      this.descripcion = descripcion.toUpperCase();
      this.marca = marca.toUpperCase();
      this.presentacion = presentacion.toUpperCase();
      this.categoria = categoria.toUpperCase();
      this.precio = precio;
      this.oferta = oferta;
      this.fechaVto = new Date(fechaVto);
  }
}

const productos = [];
productos.push(new Producto("001", "Cerveza", "Budwisser", "355 ml", "Cervezas", "45", true, "2025,1,10"));
productos.push(new Producto("002", "Cerveza", "Corona", "355 ml", "Cervezas", "55", false));
productos.push(new Producto("003", "Cerveza", "Coronita", "210 ml", "Cervezas", "30", false));
productos.push(new Producto("004", "Cerveza Ipa", "Goose Island", "473 ml", "Cervezas", "49", false));
productos.push(new Producto("005", "Cerveza", "Patricia", "473 ml", "Cervezas", "49", true));
productos.push(new Producto("006", "Cerveza (envase retornable)", "Patricia", "340 ml", "Cervezas", "25", true));
productos.push(new Producto("007", "Cerveza", "Zillertal", "473 ml", "Cervezas", "53", false));
productos.push(new Producto("008", "Aperitivo", "Campari", "750 ml", "Aperitivos", "600", true));
productos.push(new Producto("009", "Gin tonic", "Dr Lemon", "lata 310 ml", "Tragos", "150", true));
productos.push(new Producto("010", "Fernet", "Branca", "750 ml", "Aperitivos", "300", true));
productos.push(new Producto("011", "Gin", "Alquimista", "500 ml", "Blancas", "600", false));
productos.push(new Producto("012", "Gin", "Gordons", "500 ml", "Blancas", "600", false));
productos.push(new Producto("013", "Gin", "Tanqueray", "750 ml", "Blancas", "600", false));
productos.push(new Producto("014", "Licor", "Jagermeifter", "700 ml", "Licores", "600", false));
productos.push(new Producto("015", "Ron Añejo Especial", "Havana", "750 ml", "Blancas", "800", false));
productos.push(new Producto("016", "Vodka", "Smirnoff", "750 ml", "Blancas", "600", true));



// FUNCION CAMBIAR DE PRECIO DTO

const cambiarPrecioDto = (dto) => {
  productos.forEach(producto => {
      if (producto.oferta == true) {
          producto.precio = producto.precio * ((100 - dto) / 100);
          producto.descripcion = producto.descripcion + " (Precio Oferta)";
      }
  })
}
cambiarPrecioDto(10);
console.log(productos);

// FUNCION ORDENAR ARAY X DESCRIPCION

const ordenarListadoDesc = (prod1, prod2) => {

  if (prod1.descripcion > prod2.descripcion) {
      return 1
  }
  if (prod1.descripcion < prod2.descripcion) {
      return -1
  }
  if (prod1.descripcion = prod2.descripcion) {
      return 0
  }
}
let listadoOrdenado = productos.slice();
listadoOrdenado.sort(ordenarListadoDesc);

console.log(listadoOrdenado);

// FUNCION FILTRAR ARRAY SOLO OFERTAS

const mostrarProductosOferta = (producto) => {
  return producto.oferta == true
}
const productosFiltrados = productos.filter(mostrarProductosOferta);
console.log(productosFiltrados);

//FUNCION BUSCAR Y MOSTRAR ALERT PRIMER ELEMENTO

let productoBuscado = prompt("Ingrese el producto que desea buscar:");
productoBuscado = productoBuscado.toLocaleUpperCase();
const busqueda = productos.find((producto) => producto.descripcion.includes(productoBuscado));
alert(`${busqueda.descripcion} ${busqueda.marca} ${busqueda.presentacion} $ ${busqueda.precio}`);