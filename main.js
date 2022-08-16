
// const carrito = [];

// const productos = [ 
//   {id: 1, title: "Pollera Sofia", price: 1200},
//   {id: 2, title: "Remera Umma", price: 1000},
//   {id: 3, title: "Pantalón Berlin", price: 2500},
//   {id: 4, title: "Short Melina", price: 2000},
// ];

// let cards = "";

// productos.forEach((producto) => {
//   const idButton = `add-cart${producto.id}` 
//   document.getElementById("seccion-card").innerHTML += `<div class="col mb-5">
//   <div class="card h-100">
//       <!-- Product image-->
//       <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
//       <!-- Product details-->
//       <div class="card-body p-4">
//           <div class="text-center">
//               <!-- Product name-->
//               <h5 class="fw-bolder">
//                 ${producto.title}
//               </h5>
//               <!-- Product price-->
//               $40.00 - $80.00
//           </div>
//       </div>
//       <!-- Product actions-->
//       <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
//           <div class="text-center">
//               <a id="${idButton}" class="btn btn-outline-dark mt-auto" data-id="${producto.id}">
//                   Agregar al carrito
//               </a>
//           </div>
//       </div>
//     </div>
//   </div>` 
// })

// productos.forEach((producto) => {
//   const idButton = `add-cart${producto.id}`  
//   document.getElementById(idButton).addEventListener('click', () => {
//     carrito.push(producto);
//     console.log(carrito)
//   })
// });

const carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];
const total = carrito.reduce((acumulador, {price}) => acumulador + price, 0);
document.getElementById("cart-total").innerHTML = `${carrito.length}  - $${total}`;



const productos = [ 
    {
        id: 1, 
        title: "Pollera Sofia",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBalmNIoUdA2eAc0tCwnAlNZHAtJelc3dyVA&usqp=CAU",
        price: 1200,
        category: "Parte de abajo"
    },
    {
        id: 2, 
        title: "Remera Umma",
        img: "https://img.ar.class.posot.com/es_ar/2017/09/14/Remeras-Gucci-Levis-Fila-Tommy-tendencia-20170914112949.jpg", 
        price: 1000,
        category: "Parte de arriba",
    },
    {
        id: 3, 
        title: "Pantalón Berlin", 
        img: "https://ae01.alicdn.com/kf/H18e87f3254df48118a6432ca7f8a3bd0w/Pantalones-de-sastre-con-detalles-plisados-para-mujer.jpg_Q90.jpg_.webp",
        price: 3500,
        category: "Parte de abajo"
    },
    {
        id: 4, 
        title: "Short Melina", 
        img: "https://images-na.ssl-images-amazon.com/images/I/51ztXJf3M-S._AC_UL604_SR604,400_.jpg",
        price: 2000,
        category: "Parte de abajo"
    },
];


//FUNCION QUE CREA LAS CARDS en la pantalla principal

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
            <button>Sacar del carrito</button>
        </td>
    </tr>`
})
}

//FUNCION QUE PERMITE AGREGAR PRODUCTOS AL CARRITO

productos.forEach((producto) => {
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
  })
});

console.log(carrito)


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

  productosFiltrados.forEach(({id,title,img,price}) => {
      const idButton = `add-cart${id}` 
      document.getElementById("seccion-card").innerHTML += `<div class="card">
          <img class="card-img-top" style="height:210px" src="${img}">
          <h4 class="text-center">${title}</h4>
          <!-- Product price-->
              <div class="precio text-center">
                <p>$${price}</p>
              </div>
          <!-- Product actions-->
          <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
              <div class="text-center">
                  <a id="${idButton}" class="btn btn-outline-dark mt-auto" data-id="${id}">
                      Agregar al carrito
                  </a>
              </div>
          </div>
      </div>`;
  })
}
