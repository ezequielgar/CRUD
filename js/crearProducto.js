export class Producto {
    constructor(campoCodigo,campoProducto,campoCantidad,campoDescripcion,campoURL){
        this.codigo = campoCodigo;
        this.producto = campoProducto;
        this.cantidad = campoCantidad;
        this.descripcion = campoDescripcion;
        this.url = campoURL;
    }

     //los GET
     get mostrarCodigo(){
        return this.codigo;
    }
    get mostrarProducto(){
        return this.producto;
    }
    get mostrarDescripcion(){
        return this.descripcion;
    }
    get mostrarCantidad(){
        return this.cantidad;
    }
    get mostrarURL(){
        return this.url;
    }
    //Los SET
    set modificarCodigo (nuevoCodigo){
        this.codigo = nuevoCodigo;
    }
    set modificarProducto (nuevoProducto){
        this.producto = nuevoProducto;
    }
    set modificarDescripcion (nuevaDescripcion){
        this.descripcion = nuevaDescripcion;
    }
    set modificarCantidad (nuevaCantidad){
        this.cantidad = nuevaCantidad;
    }
    set modificarURL (nuevaURL){
        this.url = nuevaURL;
    }
}
