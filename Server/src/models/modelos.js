class Usuario {
    constructor(idUsuario, nombre, correo, contrasena, tipo, estado){
        this.idUsuario = idUsuario;
        this.nombre = nombre;
        this.correo = correo;
        this.contrasena = contrasena;
        this.tipo = tipo;
        this.estado = estado;
    }

    iniciarSesion(correo, contrasena){
        if(this.estado !== "ACTIVO"){
            return false
        } 
        return this.correo === correo && this.contrasena === contrasena;
    }
    cerrarSesion(){
        return true
    }
    registrarse(){
        this.estado = "ACTIVO"
        return true 
    }
    cambiarContrasena(nuevaContrasena){
        this.contrasena = nuevaContrasena
    }
    actualizarPerfil(nombre, correo){
        this.nombre = nombre;
        this.correo = correo;
    }
}



class Notificacion {
    constructor(idNotificacion, mensaje, fechaNotificacion, estado){
        this.idNotificacion = idNotificacion;
        this.mensaje = mensaje;
        this.fechaNotificacion = fechaNotificacion;
        this.estado = estado;
    }

    enviar(){
        this.estado = "ENVIADA";
        return true 
    };
    marcarLeida(){
        this.estado = "LEIDA";
    };
    estaLeida(){
        return this.estado === "LEIDA"
    }
    eliminar(){
        this.estado = "ELIMINADA"
    };
}


class Prestamo {
    constructor(idPrestamo, fechaPrestamo, fechaDevolucion, estado){
        this.idPrestamo = idPrestamo;
        this.fechaPrestamo = fechaPrestamo;
        this.fechaDevolucion = fechaDevolucion;
        this.estado = estado;
    }

    registrarPrestamo(){
        this.estado = "ACTIVO";
        this.fechaPrestamo = new Date();
        return true 
    }

    registrarDevolucion(){
        if(this.estado !== "AVTIVO"){
            return false
        }

        this.estado = "DEVUELTO"
        this.fechaDevolucion = new Date();
        return true
    }

    verificarEstado(){
        return this.estado
    }
}

class Reserva {
    constructor(idReserva, fechaReserva, estado){
        this.idReserva = idReserva;
        this.fechaReserva = fechaReserva;
        this.estado = estado;
    }

    crearReserva(){
        this.estado = "ACTIVA";
        this.fechaReserva = new Date();
    };

    cancelarReserva(){
        this.estado = "CANCELADA"
    };

    validarReserva(){
        return this.estado === "ACTIVA"
    };
}

class Libro {
    constructor(idLibro, titulo, autor, genero, anoPublicacion, cantidadDisponible, isbn){
        this.idLibro = idLibro;
        this.titulo = titulo;
        this.autor = autor;
        this.genero = genero;
        this.anoPublicacion = anoPublicacion;
        this.cantidadDisponible = cantidadDisponible;
        this.isbn = isbn;
    }

    verificarDisponibilidad(){
        return this.cantidadDisponible > 0
    }
    
    consultarCantidadDisponible(){
        return this.cantidadDisponible
    }

    cambiarDisponibilidad(cantidadDisponible){
        this.cantidadDisponible = cantidadDisponible
    }


    registrarLibro(){
        /* Logica de dominio, se deja ersponsabilidad al backend*/
    }

    eliminarLibro(){
        /* Logica de dominio, se deja ersponsabilidad al backend*/
    }
}

class Inventario {
    constructor(idInventario, stockActual, stockMinimo, stockMaximo){
        this.idInventario = idInventario;
        this.stockActual = stockActual;
        this.stockMinimo = stockMinimo;
        this.stockMaximo = stockMaximo;
    }

    actualizarStock(cantidad){
        this.stockActual = cantidad
    };

    validarLimiteMinimo(){
        return this.stockActual >= this.stockMinimo
        
    };

    registrarEntradaSalida(cantidad){
        this.stockActual += cantidad
    };
}

class Reporte {
    constructor(idReporte, tipo, fechaGeneracion, contenido, estado){
        this.idReporte = idReporte;
        this.tipo = tipo;
        this.fechaGeneracion = fechaGeneracion;
        this.contenido = contenido;
        this.estado = estado;
    }

    generar(){
        this.fechaGeneracion = new Date()
        this.estado = "GENERADO"
    };
    exportarPdf(){
        //logica en otra capa
    };
    cambiarEstado(estado){
        this.estado = estado
    };
}

class Sesion {
    constructor(idSesion, inicio, fin){
        this.idSesion = idSesion;
        this.inicio = inicio;
        this.fin = fin;
    }

    iniciarSesion(){
        this.inicio = new Date()
        this.fin = null
    }

    cerrarSesion(){
        this.fin = new Date()
    }

    calcularDuracion(){
        if(!this.inicio || !this.fin){
            return 0
        }

        const duracionMs = this.fin - this.inicio;
        return Math.floor(duracionMs / 1000)
    }
}