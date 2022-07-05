function pagoSeguroAutomotorSemestral(entrada) {
    let resultado = entrada + entrada;
    return resultado;
}
function pagoSeguroMensualConInteres(montoAPagar, cantidadDeMeses) {
    const pagosARealizar = [];
    let ultimoPago = montoAPagar;
    for (let i = 0; i < cantidadDeMeses; i++) {
        let nuevoMonto = Math.floor(ultimoPago + montoAPagar * 0.075);
        pagosARealizar.push(nuevoMonto);
        ultimoPago = nuevoMonto;
    }
    let mensaje = "Los montos de los pagos mensuales son los siguientes: \n";
    console.log(pagosARealizar);
    for (let j = 0; j < pagosARealizar.length; j++) {
        mensaje += "Mes " + (j + 1) + " : $" + pagosARealizar[j] + "\n";
    }
    alert(mensaje);
}
//agregando eventos

const formulario = document.getElementById("form");

formulario.addEventListener("submit", function (e) {
    e.preventDefault();
    if (typeof foo !== "undefined") {
    }
    let mail = document.getElementById("email-form").value;
    console.log(mail);
});

const modalPoliza = new bootstrap.Modal("#cotizacion", {
    keyboard: false,
});

const inputMarca = document.getElementById("inputMarca");
const inputAnio = document.getElementById("inputAnio");
const inputModelo = document.getElementById("inputModelo");
const inputVersion = document.getElementById("inputVersion");
const inputProvincia = document.getElementById("inputProvincia");

const polizaMarca = document.getElementById("polizaMarca");
const polizaAnio = document.getElementById("polizaAnio");
const polizaModelo = document.getElementById("polizaModelo");
const polizaVersion = document.getElementById("polizaVersion");
const polizaProvincia = document.getElementById("polizaProvincia");

const formularioCotizador = document.getElementById("formularioCotizador");
formularioCotizador.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!inputMarca.value) {
        alert("Debe ingresar una marca");
        return;
    }
    if (!inputAnio.value) {
        alert("Debe ingresar un año");
        return;
    }
    if (!inputModelo.value) {
        alert("Debe ingresar un modelo");
        return;
    }
    if (!inputVersion.value) {
        alert("Debe ingresar una version");
        return;
    }
    if (!inputProvincia.value) {
        alert("Debe ingresar una provincia");
        return;
    }

    modalPoliza.show();

    console.log("Formulario correcto");


    polizaMarca.innerText = inputMarca.value;
    polizaAnio.innerText = inputAnio.value;
    polizaModelo.innerText = inputVersion.value;
    polizaVersion.innerText = inputVersion.value;
    polizaProvincia.innerText = inputProvincia.value;
});

const guardarPoliza = document.getElementById("guardarPoliza");

guardarPoliza.addEventListener('click', () => {

    modalPoliza.hide()
    const datosPoliza = {
        marca: inputMarca.value,
        anio: inputAnio.value,
        modelo: inputModelo.value,
        version: inputVersion.value,
        provincia: inputProvincia.value,
        costo: 3600
    }
    const datosJson = JSON.stringify(datosPoliza)
    localStorage.setItem('ultimaPoliza', datosJson)
})
const verPolizaGuardada = document.getElementById("verPolizaGuardada");
verPolizaGuardada.addEventListener ('click', function () {
    let datosPoliza = localStorage.getItem ('ultimaPoliza')
    datosPoliza = JSON.parse(datosPoliza)

    polizaMarca.innerText = datosPoliza.marca;
    polizaAnio.innerText = datosPoliza.anio;
    polizaModelo.innerText = datosPoliza.modelo;
    polizaVersion.innerText = datosPoliza.version;
    polizaProvincia.innerText = datosPoliza.provincia;

    modalPoliza.show()

})

