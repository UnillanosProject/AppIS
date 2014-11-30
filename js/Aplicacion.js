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
    var grafico = document.getElementById('objectGrafico');
//    alert(sigla);
//    grafico.contentWindow.cargarDatosFinance(sigla,nombreEmpresa);
//    grafico.data="templates/Grafica.html?sigla="+sigla+"&nombre="+nombreEmpresa;
    grafico.src="templates/Grafica.html?sigla="+sigla+"&nombre="+nombreEmpresa;
    //grafico.src=grafico.src;
    //var content = grafico.innerHTML;
   //alert(content);
    //grafico.innerHTML= content;
    //document.getElementById('objectGrafico').reload();
}

function actualizarLista() {
    alert("Hoijisdji");
    var lista = document.getElementById('objectList');
    lista.src=lista.src;
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

var yqlcallbackdatos = function (datos) {
        for (var i = 0; i < datos.query.count; i++) {
             empresas[i].cotizacion=datos.query.results.quote[i].LastTradePriceOnly;
             var porcentaje = datos.query.results.quote[i].ChangePercentRealtime;
             empresas[i].cambio=datos.query.results.quote[i].ChangeRealtime+" ("+porcentaje.substring(6,porcentaje.lenght)+")";
             empresas[i].rango=datos.query.results.quote[i].DaysRange;
        }
        //alert(empresas[9].cotizacion+"\n"+empresas[9].cambio+"\n"+empresas[9].rango);
    };
    
function tempAlert(msg,duration)
{
     var el = document.createElement("div");
     el.setAttribute("style","position:absolute;top:40%;left:20%;background-color:white;");
     el.innerHTML = msg;
     setTimeout(function(){
      el.parentNode.removeChild(el);
     },duration);
     document.body.appendChild(el);
}
