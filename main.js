//datos dentro del array: matricula y marca
var parking = [];

//variables globales
var marcaAuto = "";
var matriculaAuto = "";
var horas = 0;
var matricualSalida = "";
var cobro = 0;
var pagoCliente = 0;

//obteniendo el valor del input marcaIn=marca
$(document).on('change', '#marcaIn', function (event) {
    marcaAuto = $("#marcaIn option:selected").text();
    console.log("marca: " + marcaAuto);
    entrada();
});

//obteniendo el valor del input matriculaIn=matricula
$(document).on('change', '#matriculaIn', function (event) {
    matriculaAuto = $("#matriculaIn").val();
    console.log("matricula: " + matriculaAuto);
});

//obtener la opcion de horas seleccionadas 
$('select#horaOut').on('change', function () {
    horas = $(this).val();
    console.log("horas: " + horas);
    tarifa();
});

//obtener la matricula del auto en salida
$(document).on('change', '#matriculaOut', function (event) {
    matricualSalida = $("#matriculaOut").val();
    console.log("matricula salida: " + matricualSalida);
});

//obtener el pago del cliente
$(document).on('change', '#pago', function (event) {
    pagoCliente = $("#pago").val();
    console.log("pago: " + pagoCliente);
});

//registro entrada del auto
function entrada() {
    parking.push({
        matricula: matriculaAuto,
        marca: marcaAuto
    });
    console.log(parking);
}

//funcion para mostrar el total de autos en el parking
function consultaAutosTotales() {

}

//funcion para calcular el pago por el tiempo de estacionamiento
function tarifa() {
    switch (horas) {
        case "1":
            cobro = 100;
            break;
        case "2":
            cobro = 200;
            break;
        case "3":
            cobro = 500;
            break;
        default:
            cobro = 0;
            break;
    }
    console.log("cobro: " + cobro);
    $("#tarifaOut").val(cobro);

}

//funcion para buscar el auto por matricula
function buscarAuto() {
    try {
        var buscado = parking.find(matricula => matricula.matricula === matriculaSalida);
        var asignar = buscado.marca;
        console.log(asignar);
        $("#marcaOut").val(asignar);
    } catch (err) {
        console.log(err);
        alert("No se encontro el auto");
    }
}

//funcion para calcular el pago
function pago() {
    if (pagoCliente < cobro) {
        alert("El pago es insuficiente");
    } else {
        var cambio = pagoCliente - cobro;
        alert("Su cambio es de: $" + cambio);
    }
}

//funcion para registrar la entrada del auto en la tabla 
function registrarEntrada() {
    if ($("#matriculaIn").val() == "") {
        alert("Debe ingresar la matricula del auto");
    }else if ($("#marcaIn").val() == "") {
        alert("Debe ingresar la marca del auto");
    }else {
        var index = parking.findIndex(matricula => matricula.matricula === matriculaAuto);
        $("#tabla>tbody").append("<tr><td>" + (index + 1) + "</td>" +
            "<td>" + parking[index].matricula + "</td>" +
            "<td>" + parking[index].marca + "</td></tr>");
        $("#marcaIn").val("");
        $("#matriculaIn").val("");
    }
}

//funcion para buscar el auto por matricula y marca
function consultaAuto() {
    var tabla = document.getElementById("tabla");
    var busqueda = document.getElementById("busquedaTxt").value.toLowerCase();
    for (var i = 1; i < tabla.rows.length; i++) {
        var cellsOfRow = tabla.rows[i].getElementsByTagName('td');
        var found = false;
        for (var j = 0; j < cellsOfRow.length && !found; j++) {
            var compareWith = cellsOfRow[j].innerHTML.toLowerCase();
            if (busqueda.length == 0 || (compareWith.indexOf(busqueda) > -1)) {
                found = true;
            }
        }
        if (found) {
            tabla.rows[i].style.display = '';
        } else {
            tabla.rows[i].style.display = 'none';
        }
    }
}