let modelos = [
    new Modelo(1, "Toyota", "Corolla", "2300"),
    new Modelo(2, "Toyota", "Hilux", "2500"),
    new Modelo(3, "Toyota", "Etios", "1900"),
    new Modelo(4, "Nissan", "Frontier", "2400"),
    new Modelo(5, "Nissan", "Versa", "1900"),
    new Modelo(6, "Nissan", "March", "1400"),
    new Modelo(7, "Ford", "F-150", "3900"),
    new Modelo(8, "Ford", "Ranger", "2800"),
    new Modelo(9, "Ford", "Maverick", "2000"),
];
let historialDePolizas = [];

// Carga Dinamica de marca-modelo
const selectMarca = document.getElementById("selectMarca");
const selectModelo = document.getElementById("selectModelo");
function cargarMarcas() {
    let marcasUnicas = [...new Set(modelos.map((modelo) => modelo.marca))];
    actualizarOption(marcasUnicas, selectMarca);
}
function cargarModelos() {
    let modelosFiltrados = modelos.filter(
        (modelo) => modelo.marca === selectMarca.value
    );
    actualizarOption(
        modelosFiltrados.map((modelo) => modelo.nombre),
        selectModelo
    );
}
function actualizarOption(opciones, select) {
    select.innerHTML = "";
    let opcionPorDefecto = document.createElement("option");
    opcionPorDefecto.textContent = "Selecciona una opcion.";
    opcionPorDefecto.selected = true;
    opcionPorDefecto.disabled = true;
    select.append(opcionPorDefecto);
    for (let opcion of opciones) {
        let nuevaOption = document.createElement("option");
        nuevaOption.value = opcion;
        nuevaOption.innerText = opcion;
        select.append(nuevaOption);
    }
}
//agregando eventos
const modalPoliza = new bootstrap.Modal("#cotizacion", {
    keyboard: false,
});
const datosPoliza = document.getElementById("datosPoliza");
const botonCotizar = document.getElementById("botonCotizar");
const selectorMeses = document.getElementById("selectorMeses");
const enviarCorreoBtn = document.getElementById("enviarCorreoBtn");
const inputCorreo = document.getElementById("inputCorreo");

function cargarNuevaPoliza() {
    let poliza = crearPoliza();
    if (poliza) {
        calcularMonto(poliza);
        mostrarPoliza(poliza);
    }
}
function crearPoliza() {
    let formularioCotizador = document.getElementById("formularioCotizador");
    if (!formularioCotizador.checkValidity()) return false;
    const datosFormulario = new FormData(formularioCotizador);
    const modelo = modelos.filter(
        (modelo) => modelo.nombre === datosFormulario.get("modelo")
    )[0];
    let poliza = new Poliza(
        modelo,
        datosFormulario.get("anio"),
        datosFormulario.get("provincia")
    );
    return poliza;
}
function calcularMonto(poliza) {
    const meses = document.getElementById("selectorMeses").value ?? 1;
    if (!poliza) {
        poliza = crearPoliza();
    }
    poliza.calcularMonto(meses);
    document.getElementById("montoMensual").textContent = poliza.montoMensual;
    document.getElementById("montoTotal").textContent = poliza.montoTotal;
}
function mostrarPoliza(poliza) {
    datosPoliza.innerHTML = `<p><span class="text-primary">Marca</span>:${poliza.modelo.marca}</p>
                            <p><span class="text-primary">Modelo</span>:${poliza.modelo.nombre}</p>
                            <p><span class="text-primary">Año</span>:${poliza.anioDeFabricacion}</p>
                            <p><span class="text-primary">Provincia</span>:${poliza.provincia}</p>`;
    modalPoliza.show();
}

function cargarPolizaEnTabla(poliza) {
    let columna = ` <td>${poliza.modelo.marca}</td>
                    <td>${poliza.modelo.nombre}</td>
                    <td>${poliza.anioDeFabricacion}</td>
                    <td>$${poliza.montoMensual}</td>
                    <td>$${poliza.montoTotal}</td>
                    <td>${poliza.meses}</td>
                    <td>${poliza.provincia}</td>`;

    let fila = document.createElement("tr");
    fila.innerHTML = columna;
    let tabla = document.getElementById("tbody");
    tabla.appendChild(fila);
}

function confirmarPoliza() {
    const meses = document.getElementById("selectorMeses").value ?? 1;
    let poliza = crearPoliza();
    poliza.calcularMonto(meses);
    historialDePolizas.push(poliza);
    const datosJson = JSON.stringify(historialDePolizas);
    localStorage.setItem("historialDePolizas", datosJson);
    actualizarTabla ();
    modalPoliza.hide();
}
function actualizarTabla (){
    let tabla = document.getElementById("tbody")
    tabla.innerHTML = ""
    for (let poliza of historialDePolizas){
        cargarPolizaEnTabla (poliza)
    }
}


//Agregando Fetch (Envio de correo)
function enviarCorreo() {
    let poliza = crearPoliza();
    var data = {
        service_id: "service_qi55ghg",
        template_id: "template_hryk8o3",
        user_id: "CSnur9VlFq1hKbzNB",
        template_params: {
            marca: poliza.modelo.marca,
            anio: poliza.anioDeFabricacion,
            modelo: poliza.modelo.nombre,
            provincia: poliza.provincia,
            enviar_a: inputCorreo.value,
        },
    };
    fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((data) => data.text())
        .then((text) => {
            if (text !== "OK") {
                throw new Error("La API respondio con error");
            } else {
                alert("Su póliza ha sido enviada con éxito ");
            }
        })
        .catch((err) => console.error(err));
}
// Cargo eventos
(function () {
    cargarMarcas();
    selectMarca.addEventListener("change", cargarModelos);
    botonCotizar.addEventListener("click", cargarNuevaPoliza);
    selectorMeses.addEventListener("change", () => calcularMonto());
    enviarCorreoBtn.addEventListener("click", enviarCorreo);
    guardarPoliza.addEventListener("click", confirmarPoliza);
    borrarHistorial.addEventListener("click", () => {
        localStorage.removeItem("historialDePolizas");
        historialDePolizas=[];
        actualizarTabla()

});
    historialDePolizas = JSON.parse(
        localStorage.getItem("historialDePolizas") ?? "[]"
    );
    if(historialDePolizas){
        actualizarTabla()
    }
})();
