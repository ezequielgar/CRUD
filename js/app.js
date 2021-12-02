// traer los datos del localStorage
let listaProductos = JSON.parse (localStorage.getItem('listaProductosKey')) || [];
listaProductos.forEach((producto)=>{
    crearCard(producto);
});
function crearCard(producto){
    let grilla = document.getElementById('grillaPrincipal');
    grilla.innerHTML += `<div class="col-sm-12 col-md-4 text-center ">

    <div class="card" style="width: 18rem;">
        <img src="${producto.url}" class="card-img-top" alt="${producto.producto} ">
        <div class="card-body">
          <h5 class="card-title">${producto.producto} </h5>
          <p class="card-text">${producto.descripcion} </p>
          
        </div>
      </div>
</div>`
    

}