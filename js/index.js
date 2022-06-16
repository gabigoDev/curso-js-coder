       //Incorporando Arrays

        function pagoSeguroAutomotorSemestral(entrada) {
            
            for (let i= 6; i <= 18; i*1.21){
                alert("Monto a depositar en "+i+" cuotas = "+entrada/i*1.21);
                i+=6;
            }
        }
        function pagoSeguroMensualConInteres(montoAPagar, cantidadDeMeses) {
            const pagosARealizar = [];
            let ultimoPago = montoAPagar;
            for (let i = 0; i < cantidadDeMeses; i++) {
                let nuevoMonto = Math.floor(ultimoPago + montoAPagar * 0.075);
                pagosARealizar.push(nuevoMonto)
                ultimoPago = nuevoMonto;
            }
            let mensaje = "Los montos de los pagos mensuales son los siguientes: \n";
            console.log(pagosARealizar);
            for(let j = 0; j < pagosARealizar.length; j++){
                mensaje += "Mes "+(j+1)+" : $"+pagosARealizar[j]+"\n";
            }
            alert(mensaje);
        }
        
        let entrada = prompt("Bienvenido a su cotizador de seguros: \n 1 - Calcular interes semestral. \n 2 - Calcular interes mensual (0.75% de interes por cada mes adicional)");
        
        
        if (entrada == 1) {
            const montoSemestral = prompt("Ingrese monto semestral a calcular:");
            pagoSeguroAutomotorSemestral(montoSemestral);
        } else if (entrada == 2) {
            const monto = prompt("Ingrese monto mensual a calcular:");
            const totalMeses = prompt("Ingrese la cantidad de meses a pagar:");
            pagoSeguroMensualConInteres(monto, totalMeses);
        }
        



//el cliente podrá pagar su seguro mensual o semestral en hasta 18 cuotas con una taza del 21% de interes. 