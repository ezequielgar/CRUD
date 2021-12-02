import {
  campoRequerido,
  validarGral,
  validarNros,
  validarURL,
} from "./validaciones.js";

import { Producto } from "./crearProducto.js";

//agregar eventos a los elementos del formulario

let campoCodigo = document.getElementById("codigo");

let campoProducto = document.getElementById("producto");

let campoDescripcion = document.getElementById("descripcion");

let campoCantidad = document.getElementById("cantidad");

let campoURL = document.getElementById("url");

let formularioProducto = document.getElementById("formProducto");

//lista de productos
let listaProductos =
  JSON.parse(localStorage.getItem("listaProductosKey")) || [];

let productoExistente = false; // si productoExistente = false, entonces quiero crear un nuevo producto , caso contrario modificar.

let btnNuevo = document.getElementById("nuevobtn");

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

btnNuevo.addEventListener("click", limpiarFormulario);

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
    if (productoExistente == false) {
      // agregar/crear un producto
      agregarProducto();
    } else {
      // caso 2 cuando el usuario quiere editar el producto
      modificarProducto();
    }
  }
}

function agregarProducto() {
  console.log("aqui se crea el producto");
  let productoNuevo = new Producto(
    campoCodigo.value,
    campoProducto.value,
    campoDescripcion.value,
    campoCantidad.value,
    campoURL.value
  );
  console.log(productoNuevo);
  // guardar el producto creado en el arreglo
  listaProductos.push(productoNuevo);
  console.log(listaProductos);
  limpiarFormulario();
  //guardar en localStorage el array de listaProductos
  guardarLocalstorage();
  // mostrar swal
  Swal.fire(
    "Producto Creado",
    "El producto fue creado correctamente!",
    "success"
  );
  crearFila(productoNuevo);
}

function limpiarFormulario() {
  //limpiar los value de todo el formulario
  formularioProducto.reset();
  // limpiar las clases
  campoCodigo.className = "form-control";
  campoProducto.className = "form-control";
  campoDescripcion.className = "form-control";
  campoCantidad.className = "form-control";
  campoURL.className = "form-control";
  //limpiar la variable booleana
  productoExistente = false;
}

function guardarLocalstorage() {
  localStorage.setItem("listaProductosKey", JSON.stringify(listaProductos));
}

function crearFila(producto) {
  let tabla = document.getElementById("tablaProductos");
  tabla.innerHTML += `<tr>
  <th scope="row">${producto.codigo} </th>
  <td>${producto.producto} </td>
  <td>${producto.descripcion}</td>
  <td>${producto.cantidad} </td>
  <td>${producto.url} </td>
  <td class= "col-sm-12 col-md-1">
    <button type="submit" class="btn btn-warning my-1" onclick="prepararEdicionProducto(${producto.codigo})">
      Editar
    </button>
    <button type="submit" class="btn btn-danger" onclick="borrarProducto(${producto.codigo})">
      Borrar
    </button>
  </td>
</tr>`;
}

function cargaInicial() {
  //verifica si hay datos en el localStorage || en listas productos
  if (listaProductos.length > 0) {
    //dibujar fila
    listaProductos.forEach((itemProducto) => {
      crearFila(itemProducto);
    });
  }
}

function borrarTabla() {
  let tabla = document.getElementById("tablaProductos");
  tabla.innerHTML = "";
}

window.prepararEdicionProducto = (codigo) => {
  console.log(codigo);
  // obtener el obj a modificar

  let productoBuscado = listaProductos.find((itemProducto) => {
    return itemProducto.codigo == codigo;
  });
  console.log(productoBuscado);

  // mostrar los datos en el form
  campoCodigo.value = productoBuscado.codigo;
  campoProducto.value = productoBuscado.producto;
  campoDescripcion.value = productoBuscado.descripcion;
  campoCantidad.value = productoBuscado.cantidad;
  campoURL.value = productoBuscado.url;
  // modifico la variable booleana
  productoExistente = true;
};
function modificarProducto() {
  // console.log("Modificar Producto")

  // buscar la posicion de mi prroducto dentro del array
  let posicionProducto = listaProductos.findIndex((itemProducto) => {
    return itemProducto.codigo == campoCodigo.value;
  });
  console.log(posicionProducto);

  // modificar los datos del producto dentro del array
  listaProductos[posicionProducto].producto = campoProducto.value;
  listaProductos[posicionProducto].descripcion = campoDescripcion.value;
  listaProductos[posicionProducto].cantidad = campoCantidad.value;
  listaProductos[posicionProducto].url = campoURL.value;
  // console.log(listaProductos);

  //actualizar el localStorage
  guardarLocalstorage();

  Swal.fire("Producto Modificado", "El producto fue modificado", "success");
  // limpiar los datos del formulario
  limpiarFormulario();
  // actualizar la tabla
  borrarTabla();
  listaProductos.forEach((itemProducto) => {
    crearFila(itemProducto);
  });
}
window.borrarProducto = function(codigo) {
  console.log(codigo);
  // borro el producto
  let arregloProductoBorrado = listaProductos.filter((itemProducto) => {return itemProducto.codigo != codigo;});
  console.log(arregloProductoBorrado);

  // actualizo el localStorage
  listaProductos = arregloProductoBorrado;
  guardarLocalstorage();

  // actualizo tabla
  borrarTabla();
  listaProductos.forEach((itemProducto) => {
    crearFila(itemProducto);
  });
  Swal.fire("Producto Eliminado", "El producto fue eliminado correctamente", "success");
  
}
