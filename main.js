
const carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];
const total = carrito.reduce((acumulador, producto) => acumulador + producto.price, 0);
document.getElementById("cart-total").innerHTML = `${carrito.length}  - $${total}`;

let productos = []

//FUNCION QUE CREA LAS CARDS QUE VIENEN DEL JSON
const buscarProductosJson = () => {
  fetch('productos.json')
    .then((response) => response.json())
    .then(informacion => {
      crearCards(informacion),
      agregarAlCarrito(informacion)
      productos.push(...informacion)
      console.log(productos)
    })
  }

buscarProductosJson();

//FUNCION QUE CREA LAS CARDS en la pantalla principal

function crearCards(productos){
  productos.forEach(({id,title,img,price}) => {
    const idButton = `add-cart${id}` 
    document.getElementById("seccion-card").innerHTML += `<div class="col mb-5">
    <div class="card h-100">
        <!-- Product image-->
        <img class="card-img-top" style="height:210px" src="${img}"/>
        <!-- Product details-->
        <div class="card-body p-4">
            <div class="text-center">
                <!-- Product name-->
                <h5 class="fw-bolder">
                  ${title}
                </h5>
                <!-- Product price-->
                <div class="precio">
                  <p>$${price}</p>
                </div>
            </div>
        </div>
        <!-- Product actions-->
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center">
                <a id="${idButton}" class="btn btn-outline-dark mt-auto" data-id="${id}">
                    Agregar al carrito
                </a>
            </div>
        </div>
      </div>
    </div>`   
  })
}

// FUNCIÓN QUE CREA EL MODAL DEL CARRITO

function generarCardsCarrito() {
  document.getElementById("cart-elements").innerHTML = ""
  carrito.forEach((producto) => {
    document.getElementById("cart-elements").innerHTML += `<tr>
        <th scope="row">${producto.id}</th>
        <td>${producto.title}</td>
        <td><img src="${producto.img}" style="width:130px"></td>
        <td>${producto.price}</td>
        <td>
            <button onclick="eliminarDelCarrito(${producto.id})">Sacar del carrito</button>
        </td>
    </tr>`
  })
}
generarCardsCarrito()

//FUNCION QUE PERMITE AGREGAR PRODUCTOS AL CARRITO

function agregarAlCarrito(catalogo){  
  for(const producto of catalogo) {
    const idButton = `add-cart${producto.id}`  
    document.getElementById(idButton).addEventListener('click', () => {
      carrito.push(producto);
      Swal.fire(
        'Se agregó tu producto al carrito!',
        'Vuelve a la página para seguir comprando',
        'success'
      )
      localStorage.setItem("carrito", JSON.stringify(carrito));
          const total = carrito.reduce((acumulador, producto) => acumulador + producto.price, 0);
          document.getElementById("cart-total").innerHTML = `${carrito.length} - $${total}`;
          generarCardsCarrito()
    })
  }
  console.log(carrito)
}




// FILTRAR PRODUCTOS SEGUN CATEGORIAS PARTE DE ABAJO Y PARTE DE ARRIBA

for (const nodoHTML of document.getElementsByClassName('filtrar-categoria')){
  nodoHTML.onclick = (event) => {
      const categoria = event.target.getAttribute('data-categoria')
      filtrarProductosPorCategoria(categoria)
  }
}

function filtrarProductosPorCategoria(categoria) {
  document.getElementById("seccion-card").innerHTML = "";
  const productosFiltrados = productos.filter((producto) => producto.category === categoria);
  crearCards(productosFiltrados) // CREA LAS CARDS DE PRODUCTOS FILTADOS
  agregarAlCarrito(productosFiltrados) // FUNCION QUE AGREGA PRODUCTOS FILTRADOS AL CARRITO

}


// Función de borrado del carrito
function eliminarDelCarrito(productoId) {
    const prod = carrito.find((producto) => producto.id == productoId)
    let i = carrito.indexOf(prod)
    if (i != -1) carrito.splice(i, 1)
    const total = carrito.reduce((acumulador, producto) => acumulador + producto.price, 0);
    document.getElementById("cart-total").innerHTML = `${carrito.length} - $${total}`;
    generarCardsCarrito()
    {Swal.fire({
        icon: 'success',
        title: 'Producto eliminado!',
    })}
}
