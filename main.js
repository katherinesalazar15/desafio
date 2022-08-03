
const carrito = [];

const productos = [ 
  {id: 1, title: "Pollera Sofia", price: 1200},
  {id: 2, title: "Remera Umma", price: 1000},
  {id: 3, title: "Pantalón Berlin", price: 2500},
  {id: 4, title: "Short Melina", price: 2000},
];

let cards = "";

productos.forEach((producto) => {
  const idButton = `add-cart${producto.id}` 
  document.getElementById("seccion-card").innerHTML += `<div class="col mb-5">
  <div class="card h-100">
      <!-- Product image-->
      <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
      <!-- Product details-->
      <div class="card-body p-4">
          <div class="text-center">
              <!-- Product name-->
              <h5 class="fw-bolder">
                ${producto.title}
              </h5>
              <!-- Product price-->
              $40.00 - $80.00
          </div>
      </div>
      <!-- Product actions-->
      <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div class="text-center">
              <a id="${idButton}" class="btn btn-outline-dark mt-auto" data-id="${producto.id}">
                  Agregar al carrito
              </a>
          </div>
      </div>
    </div>
  </div>` 
})

productos.forEach((producto) => {
  const idButton = `add-cart${producto.id}`  
  document.getElementById(idButton).addEventListener('click', () => {
    carrito.push(producto);
    console.log(carrito)
  })
});


