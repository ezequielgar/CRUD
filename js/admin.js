function campoRequerido(input) {
  if (input.value.trim().length > 0) {
    //console.log("paso la validacion");
    input.className = "form-control is-valid";
  } else {
    //console.log("no pasa la validacion");
    input.className = "form-control is-invalid";
  }
}

function validarNros(input) {
  // crear una expresion regular
  let patron = /^[0-9]{1,3}$/;
  // probar el funcionamiento del patro o expresion regular
  if(patron.test(input.value)){
    // cumple la expresion regular
    input.className = "form-control is-valid";
  }else{
    // si no cumple la expresion regular
    input.className = "form-control is-invalid";
  }

}

function validarURL(input){
  let patron = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;

  if (patron.test(input.value)){
    input.className = "form-control is-valid";

  } else{
    input.className = "form-control is-invalid";
  }
    
  }

function validarGral(e){
  e.preventDefault();
  console.log("funcion validar gral")

}


//agregar eventos a los elementos del formulario

let campoCodigo = document.getElementById("codigo");

let campoProducto = document.getElementById("producto");

let campoDescripcion = document.getElementById("descripcion");

let campoCantidad = document.getElementById("cantidad");

let campoURL = document.getElementById("url");

let formularioProducto = document.getElementById("formProducto");

campoCodigo.addEventListener("blur", () => {
  campoRequerido(campoCodigo);
});
campoProducto.addEventListener("blur", () => {
  campoRequerido(campoProducto);
});
campoDescripcion.addEventListener("blur", () => {
  campoRequerido(campoDescripcion);
});

campoCantidad.addEventListener("blur", () => {validarNros(campoCantidad);});

campoURL.addEventListener('blur', () => {validarURL(campoURL);});

formularioProducto.addEventListener('submit',validarGral);
