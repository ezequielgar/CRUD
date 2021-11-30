import {
  campoRequerido,
  validarGral,
  validarNros,
  validarURL,
} from "./validaciones.js";

import {Producto} from "./crearProducto.js";

//agregar eventos a los elementos del formulario

let campoCodigo = document.getElementById("codigo");

let campoProducto = document.getElementById("producto");

let campoDescripcion = document.getElementById("descripcion");

let campoCantidad = document.getElementById("cantidad");

let campoURL = document.getElementById("url");

let formularioProducto = document.getElementById("formProducto");

//lista de productos
let listaProductos = JSON.parse(localStorage.getItem('listaProductosKey')) || [];


campoCodigo.addEventListener("blur", () => {
  campoRequerido(campoCodigo);
});
campoProducto.addEventListener("blur", () => {
  campoRequerido(campoProducto);
});
campoDescripcion.addEventListener("blur", () => {
  campoRequerido(campoDescripcion);
});

campoCantidad.addEventListener("blur", () => {
  validarNros(campoCantidad);
});

campoURL.addEventListener("blur", () => {
  validarURL(campoURL);
});

formularioProducto.addEventListener("submit", guardarProducto);

cargaInicial();

function guardarProducto(e) {
  //validar los campos del formulario
  e.preventDefault();
  if (
    validarGral(
      campoCodigo,
      campoProducto,
      campoDescripcion,
      campoCantidad,
      campoURL
    )
  ) {

  }

  // agregar/crear un producto
  agregarProducto();
}

function agregarProducto() {
  console.log("aqui se crea el producto");
  let productoNuevo = new Producto(campoCodigo.value,campoProducto.value,campoDescripcion.value,campoCantidad.value,campoURL.value);
  console.log(productoNuevo);
  // guardar el producto creado en el arreglo
  listaProductos.push(productoNuevo);
  console.log(listaProductos);
  limpiarFormulario();
  //guardar en localStorage el array de listaProductos
  guardarLocalstorage();
  // mostrar swal 
  Swal.fire(
    'Producto Creado',
    'El producto fue creado correctamente!',
    'success'
  )
  crearFila(productoNuevo);


}

function limpiarFormulario(){
  //limpiar los value de todo el formulario
  formularioProducto.reset();
  // limpiar las clases
  campoCodigo.className = 'form-control';
  campoProducto.className = 'form-control';
  campoDescripcion.className = 'form-control';
  campoCantidad.className = 'form-control';
  campoURL.className = 'form-control';
}

function guardarLocalstorage(){
  localStorage.setItem('listaProductosKey', JSON.stringify(listaProductos));

}

function crearFila(producto){
  let tabla = document.getElementById('tablaProductos');
  tabla.innerHTML += `<tr>
  <th scope="row">${producto.codigo} </th>
  <td>${producto.producto} </td>
  <td>${producto.descripcion}</td>
  <td>${producto.cantidad} </td>
  <td>${producto.url} </td>
  <td class= "col-sm-12 col-md-1">
    <button type="submit" class="btn btn-warning my-1">
      Editar
    </button>
    <button type="submit" class="btn btn-danger">
      Borrar
    </button>
  </td>
</tr>`

}

function cargaInicial(){
  //verifica si hay datos en el localStorage || en listas productos
  if (listaProductos.length > 0) {
    //dibujar fila
    listaProductos.forEach((itemProducto) => {
      crearFila(itemProducto)

    });
    
  }
}

function borrarTabla(){
  let tabla = document.getElementById('tablaProductos');
  tabla.innerHTML = '';
}