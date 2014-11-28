/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Comment
 */
function verificarCambio() {
    var cambio=document.getElementById("cambio");
    if (cambio.textContent.substring(0,1)==="-") {
        cambio.className="assertive";
    }
}

function cambiarGrafico() {
    document.getElementById('objectGrafico').contentWindow.cargarDatosFinance();
}
 function cargando() {
    
}
