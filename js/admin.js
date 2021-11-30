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