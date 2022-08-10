class Modelo {
    constructor (id, marca, nombre, costoBase) {
        this.id = id;
        this.marca = marca;
        this.nombre = nombre;
        this.costoBase = costoBase;
    }
}
class Poliza {
    constructor (modelo, anioDeFabricacion, provincia) {
        this.modelo = modelo;
        this.anioDeFabricacion = anioDeFabricacion;
        this.provincia = provincia;
}

    calcularMonto(meses){
        let base = parseInt(this.modelo.costoBase)
        let interes = base * 0.04;
        this.meses = meses;
        this.montoMensual = base + interes;
        this.montoTotal = this.montoMensual * meses;
    }
}


