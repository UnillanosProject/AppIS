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

function cambiarGrafico(sigla,nombreEmpresa) {
    //document.getElementById('objectGrafico').contentWindow.cargarDatosFinance();
    document.getElementById('objectGrafico').data="templates/Grafica.html?sigla="+sigla+"&nombre="+nombreEmpresa;
    //document.getElementById('objectGrafico').reload();
}
 function cargando() {
    
}
function TomaVariables(name){
         var regexS = "[\\?&]"+name+"=([^&#]*)";
         var regex = new RegExp (regexS);
         var tmpURL = window.location.href;
         var results = regex.exec(tmpURL);
            if(results==null){
                  return "";
             }else{
                   return results[1];
    }
}
