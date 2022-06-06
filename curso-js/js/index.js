
/* let numero = +(prompt('introduzca un numero'));
let resultado = numero / 10;
console.log(resultado); */


/* EJERCICIO CON GRADOS DE TEMPERATURA
Un programa donde el usuraio ingrese la temperatura en 
Celcius y el se muestre la temperatura en Fahrenheit.

F = (C * 1.8) + 32.
*/


 //let celcius = parseInt(prompt('Ingrese los grados celcius'));

//let fahrenheit = (celcius *1.8) + 32;

//console.log(fahrenheit + "°F");/*

//Condicion IF (= operador de asignacion, == operador de comparacion)
/* let llueve = true;
    if (llueve) {
    console.log("Lleva Paraguas");
} */

//EJEMPLOS CON ELSE
/*let modeloAuto = "vento"
if (modeloAuto == "taos"){
    console.log ("El modelo es un vento");

} else{
    console.log("El modelo NO es un vento")
}*/

//RECETA ARROZ

/* let tipo = prompt("que tipo de arroz desea?: bien cocido o poco cocido");
console.log (tipo == "bien cocido")

if (tipo == "bien cocido"){
    console.log("preprando arroz bien cocido");
}else{
        console.log("preparando arroz poco cocido");
    } */


        //Realizacion Desafio "Simulador Interactivo"

        function pagoSeguroAutomotorSemestral() {
            let entrada = +prompt("Bienvenido a su cotizador de seguros, ingrese monto mensual o semestral a calcular:");
            for (let i= 6; i <= 18; i*1.21){
                alert("Monto a depositar en "+i+" cuotas = "+entrada/i*1.21);
                i+=6;
            }
        }
        pagoSeguroAutomotorSemestral();
//el cliente podrá pagar su seguro mensual o semestral en hasta 18 cuotas con una taza del 21% de interes. 