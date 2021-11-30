export function campoRequerido(input) {
    if (input.value.trim().length > 0) {
      //console.log("paso la validacion");
      input.className = "form-control is-valid";
      return true;
    } else {
      //console.log("no pasa la validacion");
      input.className = "form-control is-invalid";
      return false;
    }
  }
  
  export function validarNros(input) {
    // crear una expresion regular
    let patron = /^[0-9]{1,3}$/;
    // probar el funcionamiento del patro o expresion regular
    if (patron.test(input.value)) {
      // cumple la expresion regular
      input.className = "form-control is-valid";
      return true;
    } else {
      // si no cumple la expresion regular
      input.className = "form-control is-invalid";
      return false;
    }
  }
  
  export function validarURL(input) {
    let patron = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
  
    if (patron.test(input.value)) {
      input.className = "form-control is-valid";
      return true;
    } else {
      input.className = "form-control is-invalid";
      return false;
    }
  }
  
  export function validarGral(campoCodigo,campoProducto,campoDescripcion,campoCantidad,campoURL) {
    
    // console.log("funcion validar gral");
    //volver a validar todos los campos
    if (
      campoRequerido(campoCodigo) &&
      campoRequerido(campoProducto) &&
      campoRequerido(campoDescripcion) &&
      validarNros(campoCantidad) &&
      validarURL(campoURL)) {
    //   console.log("si paso la validacion");
      let alerta = document.getElementById("msjAlerta");
      alerta.className = "alert alert-danger my-2 d-none";
      return true;
    } else {
    //   console.log("no paso la validacion");
      let alerta = document.getElementById("msjAlerta");
      alerta.className = "alert alert-danger my-2";
      return false;
    }
  }