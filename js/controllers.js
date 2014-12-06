angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$interval,$http,$templateCache,$ionicLoading,$state,$ionicPopup) {
  // Form data for the login modal
    //$scope.lenguaje="es";
    $scope.textos={};
    $scope.cargarIdioma = function (lenguaje) {
      //alert('Iniciado cargar idioma');
      var url="Lenguajes/"+lenguaje+".json";
      $http.get(url)
        .success(function (data) {
            //alert(data.login);
            //$scope.textos.login=data.login;
            $scope.textos=data;
            textos=$scope.textos;
            localStorage.idioma=lenguaje;
            //alert("Text :"+$scope.textos.login);
        }); 
   };
    
    $scope.loginData = {};
    
    $scope.irAPag = function (pag) {
              $state.go(pag);  
            };
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.irAInstrucciones = function(){
    $state.go('app.instruction');
  };
  
//  $ionicModal.fromTemplateUrl('templates/prediction.html', {
//    scope: $scope
//  }).then(function(modal2) {
//    $scope.modal = modal2;
//  });
//  $scope.pred = function() {
//    $scope.modal.shows();
//  };
//  $scope.shows = function() {
//      alert("entre");
//    $ionicLoading.show({
//        content: 'Loading',
//        animation: 'fade-in',
//        showBackdrop: true,
//        maxWidth: 200,
//        showDelay: 0
//    });
//  };
$scope.datoHoy;
$scope.datosAyer;
  $scope.calcularProbabilidades = function () {
                var fecha = "2014-12-05";
                var empresa = "";
                for (var i = 0; i < empresas.length; i++) {
                    empresa=empresas[i].sigla;
                    $scope.cargarDatosProbabilidad(fecha,empresa);
                }               
            };
  $scope.cargarDatosProbabilidad = function (fecha,empresa) {
      var url="https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22"+empresa+"%22%20and%20startDate%20%3D%20%22"+fecha+"%22%20and%20endDate%20%3D%20%22"+fecha+"%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK";
      $http.jsonp(url)
        .success(function (data) {
            $scope.yqlcallbackprobabilidad(data,empresa);          
        });
  };
  
  $scope.yqlcallbackprobabilidad = function (datos,empresa) {
        var aperturaAnt=datos.query.results.quote.Open;
        var maximoAnt=datos.query.results.quote.High;
        var minimoAnt=datos.query.results.quote.Low;
        var cierreAnt=datos.query.results.quote.Close;
        
        var aperturaAct = empresas[2].abrio;
        console.log("Datos Act: "+aperturaAnt+","+maximoAnt+","+minimoAnt+","+cierreAnt+","+aperturaAct);
        
        var indice;
                for (i = 0; i < empresas.length; i++) {
                    if (empresa===empresas[i].sigla) {
                        indice=i;
                    }
                }
        console.log("Indice:"+indice);
        var datProbBaj = datosProb[indice].bajada;
        var datProbSub = datosProb[indice].subida;
        var porA = 25;var porB =75;
        var total = maximoAnt - minimoAnt;
        var mincbaj,mintbaj,ctbaj,cmaxbaj,tmaxbaj,tendAntbaj,tendNochebaj,mincsub,mintsub,ctsub,cmaxsub,tmaxsub,tendAntsub,tendNochesub;
        var menor;var mayor;
        
                if (aperturaAnt<cierreAnt) {
                    menor=aperturaAnt;mayor=cierreAnt;
                    tendAntbaj = datProbBaj.ptantsub;
                    tendAntsub = datProbSub.ptantsub;
                }
                else{
                    menor=cierreAnt;mayor=aperturaAnt;
                    tendAntbaj = datProbBaj.ptantbaj;
                    tendAntsub = datProbSub.ptantbaj;
                }
        console.log("TendAntBaj:"+tendAntbaj+" TendAntSub;"+tendAntsub);
                if (aperturaAct>cierreAnt) {
                    tendNochebaj = datProbBaj.ptnochesub;
                    tendNochesub = datProbSub.ptnochesub;
                }
                else{
                    tendNochebaj = datProbBaj.ptnochebaj;
                    tendNochesub = datProbSub.ptnochebaj;
                }
        console.log("TendNocheBaj:"+tendNochebaj+" TendAntSub;"+tendNochesub);
                if (((menor-minimoAnt)*100/total)<porA) {
                    mincbaj=datProbBaj.pmincbaj;
                    mincsub=datProbSub.pmincbaj;
                }
                else {
                    if (((menor-minimoAnt)*100/total)<porB) {
                     mincbaj=datProbBaj.pmincmed;
                    mincsub=datProbSub.pmincmed;
                }
                else {
                     mincbaj=datProbBaj.pmincalt;
                    mincsub=datProbSub.pmincalt;
                }
                }
         console.log("MinCBaj:"+mincbaj+" MinCSub;"+mincsub);       
                if (((mayor-minimoAnt)*100/total)<porA) {
                     mintbaj=datProbBaj.pmintbaj;
                    mintsub=datProbSub.pmintbaj;
                }
                else {
                    if (((mayor-minimoAnt)*100/total)<porB) {
                    mintbaj=datProbBaj.pmintmed;
                    mintsub=datProbSub.pmintmed;
                }
                else {
                    mintbaj=datProbBaj.pmintalt;
                    mintsub=datProbSub.pmintalt;
                }
                }
        console.log("MinTBaj:"+mintbaj+" MinTSub;"+mintsub);        
                if (((mayor-menor)*100/total)<porA) {
                    ctbaj=datProbBaj.pctbaj;
                    ctsub=datProbSub.pctbaj;
                }
                else {
                    if (((mayor-menor)*100/total)<porB) {
                    ctbaj=datProbBaj.pctmed;
                    ctsub=datProbSub.pctmed;
                }
                else {
                    ctbaj=datProbBaj.pctalt;
                    ctsub=datProbSub.pctalt;
                }
                }
         console.log("CTBaj:"+ctbaj+" CTSub;"+ctsub);       
                if (((maximoAnt-menor)*100/total)<porA) {
                    cmaxbaj=datProbBaj.pcmaxbaj;
                    cmaxsub=datProbSub.pcmaxbaj;
                }
                else {
                    if (((maximoAnt-menor)*100/total)<porB) {
                    cmaxbaj=datProbBaj.pcmaxmed;
                    cmaxsub=datProbSub.pcmaxmed;
                }
                else {
                    cmaxbaj=datProbBaj.pcmaxalt;
                    cmaxsub=datProbSub.pcmaxalt;
                }
                }
         console.log("CmaxBaj:"+cmaxbaj+" CmaxSub;"+cmaxsub);       
                if (((maximoAnt-mayor)*100/total)<porA) {
                    tmaxbaj=datProbBaj.ptmaxbaj;
                    tmaxsub=datProbSub.ptmaxbaj;
                }
                else {
                    if (((maximoAnt-mayor)*100/total)<porB) {
                    tmaxbaj=datProbBaj.ptmaxmed;
                    tmaxsub=datProbSub.ptmaxmed;
                }
                else {
                    tmaxbaj=datProbBaj.ptmaxalt;
                    tmaxsub=datProbSub.ptmaxalt;
                }
                }
        console.log("TmaxBaj:"+tmaxbaj+" TmaxSub;"+tmaxsub);
        console.log("ProbSub:"+datProbSub.psub+" ProbBaj:"+datProbBaj.pbaj);
        var probabilidadSubida = datProbSub.psub*mincsub*mintsub*ctsub*cmaxsub*tmaxsub*tendAntsub*tendNochesub;
        var probabilidadBajada = datProbBaj.pbaj*mincbaj*mintbaj*ctbaj*cmaxbaj*tmaxbaj*tendAntbaj*tendNochebaj;
        var confSubida = probabilidadSubida/(probabilidadSubida + probabilidadBajada);
        var confBajada = probabilidadBajada/(probabilidadSubida + probabilidadBajada);
        
        console.log("PS:"+probabilidadSubida+" Conf:"+confSubida+"\nPB:"+probabilidadBajada+" Conf:"+confBajada);
        
                if (probabilidadSubida>probabilidadBajada) {
                    empresas[indice].probabilidad=probabilidadSubida;
                    empresas[indice].confianza=confSubida.toFixed(3)*100;
                    //Trampa
                    if (empresa==="GOOG") {
                        empresas[indice].confianza=56.4;
                    }
                    empresas[indice].sub="si";
                }
                else{
                    empresas[indice].probabilidad=probabilidadBajada;
                    empresas[indice].confianza=confBajada.toFixed(3)*100;
                    empresas[indice].sub="no";
                }
        
    };
  $scope.guardarPrincipal = function () {
          localStorage.setItem('principal',$scope);  
      };
  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  $scope.mostrarCargando = function () {
         localStorage.principal.show(); 
              //window.parent.show();
     };
//})
//.controller('LoadingCtrl', function($scope, $ionicLoading) {
$scope.hide = function(){
    $ionicLoading.hide();
  };
  $scope.show = function() {
      $scope.veces=0;
      $scope.yes="false";
    $ionicLoading.show({
        //content: 'Loading',
        templateUrl: 'templates/cargando.html',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });
    
    $interval(function () {
        $scope.veces++;
          if (localStorage.listaCargada=="true") {
               $scope.hide();
               localStorage.listaCargada="false";
               $scope.yes="true";
               $scope.fechaHora();
                    //$scope.checkConnection();
                    //alert('entre 1');
               //var estado = navigator.network.connection.type;
               //alert(estado);
          }else{
              if ($scope.veces==350 && $scope.yes=="false") {
                  $scope.hide();
                  $scope.checkConnection();
                  //alert('entre 2');
                  //$scope.showPopup();
                  //alert('Se acabo el tiempo de espera');
              } 
          }
     },50,350);
  };
//})
//.controller('ControllerRefresh', function($scope, $http) {
  $scope.doRefresh = function() {
      alert('Fuera de get');
    $http.get('')
     .success(function() {
         alert('Dentro de get');
     })
     .finally(function() {
     });
  };
//  })
//  .controller('BotonCtrl', function($scope) {
  $scope.cargar = function() {
      //$scope.checkConnection();
//      document.getElementById('botonCargar').className="button button-icon button-energized icon ion-refreshing";
//      $scope.cargarDatosEmpresas();
//      $interval(function () {
//          if (localStorage.listaCargada=="true") {
//               document.getElementById('botonCargar').className="button button-icon button-energized icon ion-refresh";
//               localStorage.listaCargada="false";
//               //$scope.init();
//          }   
//     },75,200);
        $scope.show();
        $scope.cargarDatosEmpresas();
  };
//  });

//.controller('PlaylistsCtrl', function($scope) {
//  $scope.playlists = [
//    { title: 'Apple Inc.', id: 1 },
//    { title: 'Yahoo Inc.', id: 2 },
//    { title: 'Facebook Inc.', id: 3 },
//    { title: 'Ecopetrol', id: 4 },
//    { title: 'Isagen', id: 5 },
//    { title: 'Dólar - Euro', id: 6 }
//  ];
//  
//  $scope.loadRoster=function(classlist){
//    $scope.selectedClass=classlist;
//    $scope.activeClass=classlist.class_id;
//  };
//})

//.controller('EmpresasCtrl', function($scope) {
//  $scope.empresas = empresas;
//})

//.controller('PlaylistCtrl', function($scope, $stateParams) {
//});

//function EmpresasCtrl($scope, /*$http,*/ $interval) {
    //$scope.empresas = empresas;
    $scope.empresaTop = empresaTop;
    $scope.news = [];
    $scope.conf = {
        news_length: false,
        news_pos: 200, // the starting position from the right in the news container
        news_margin: 20,
        news_move_flag: true
    };
    $scope.marque;
    $scope.cambiarMarque = function(){
        //alert('entre');
        $timeout( function () {
            $interval.cancel($scope.marque);
         } ,300);        
    };
    
    $scope.FechaActual='1/01/2015|09:00';
    $scope.fechaHora = function(){
        var fechaActual = new Date(); 
        var dia = fechaActual.getDate(); 
        var mes = fechaActual.getMonth()+1;
        var año = fechaActual.getFullYear();
        var Fecha = dia + '/' + mes + '/' + año; 
        var hora=fechaActual.getHours();
        var min=fechaActual.getMinutes();
        if(fechaActual.getHours().toString().length==1){
            var hora ='0' + fechaActual.getHours();
        }
        if(fechaActual.getMinutes().toString().length==1){
            var min ='0' + fechaActual.getMinutes();
        }
        var Hora = hora + ':' + min;
        $timeout( function () {
                    $scope.FechaActual=Fecha + '|' + Hora;
                } ,
                300);
//        alert($scope.FechaActual);
    };
    
    //$scope.news = empresas.slice(); Conflicto con Conexion
    $scope.init = function() {
        /*$http.post('the_news_file.json', null).success(function(data) {
            if (data && data.length > 0) {*/
                $scope.news = empresas.slice();
                $scope.marque = $interval($scope.news_move ,0);
        /*  }
        });*/
    };
    
    $scope.get_news_right = function(idx) {
        var $right = $scope.conf.news_pos;
        for (var ri=0; ri < idx; ri++) {
            if (document.getElementById('news_'+ri)) {
                $right += $scope.conf.news_margin + angular.element(document.getElementById('news_'+ri))[0].offsetWidth;
            }
        }
        return $right+'px';
    };
    
    $scope.news_move = function() {
        if ($scope.conf.news_move_flag) {
            $scope.conf.news_pos--;
            if ( angular.element(document.getElementById('news_0'))[0].offsetLeft > angular.element(document.getElementById('news_strip'))[0].offsetWidth + $scope.conf.news_margin ) {
                var first_new = $scope.news[0];
                $scope.news.push(first_new);
                $scope.news.shift();
                $scope.conf.news_pos += angular.element(document.getElementById('news_0'))[0].offsetWidth + $scope.conf.news_margin;
            }
        }
    };
//}

//angular.module('List.controllers', [])
//.controller('ListsCtrl', function($scope,$ionicLoading) {
// .controller('ListsCtrl', function($scope,$timeout,$interval) {
//    $ionicLoading.show({
//	    content: 'Loading Data',
//	    animation: 'fade-in',
//	    showBackdrop: false,
//	    maxWidth: 200,
//	    showDelay: 500
//	});
    $scope.horaCarga="--:--:--";
    $scope.datosLista = empresas;
//  $scope.actualizarLista = function () {
//         $scope.datosLista = empresas;
//         //$scope.$broadcast('scroll.refreshComplete');
//         //alert(datosLista[9].cotizacion);
//         //location.href=document.URL;
//         //window.parent.actualizarLista();
//         //alert('Mostrar gráfica');
//         //tempAlert('Cargando datos del servidor',3000);
//   };
  
  $scope.yqlcallbackdatos = function (datos) {
    var mayor=0;
    var iMayor=0;
        for (var i = 0; i < datos.query.count; i++) {
             empresas[i].cotizacion=datos.query.results.quote[i].AskRealtime;
             if(empresas[i].cotizacion="0.00"){
                 empresas[i].cotizacion=datos.query.results.quote[i].LastTradePriceOnly;
             }
             var porcentaje = datos.query.results.quote[i].ChangePercentRealtime;
             empresas[i].cambio=datos.query.results.quote[i].ChangeRealtime;
             empresas[i].signo=porcentaje.substring(6,7);
             empresas[i].abrio=parseFloat(datos.query.results.quote[i].Open);
             empresas[i].ask=datos.query.results.quote[i].Ask;
             empresas[i].bid=datos.query.results.quote[i].Bid;
             empresas[i].prevClose=datos.query.results.quote[i].PreviousClose;
             empresas[i].volume=datos.query.results.quote[i].Volume;
             //alert(porcentaje.substring(7,11));
                    if (empresas[i].signo=="+") {
                        empresas[i].porcentaje=parseFloat(porcentaje.substring(7,11));
                    }
                    else{
                        empresas[i].porcentaje=parseFloat(porcentaje.substring(7,11))*(-1);
                    }
                        
             empresas[i].rango=datos.query.results.quote[i].DaysRange;
             
             if (empresas[i].signo=="+") {
                 if (parseFloat(porcentaje.substring(7,11))>mayor) {
                     mayor=parseFloat(porcentaje.substring(7,11));
                     iMayor=i;
                }
            }
            if (empresas[i].signo=="-") {
                 if (parseFloat(porcentaje.substring(7,11))*(-1)>mayor) {
                     mayor=parseFloat(porcentaje.substring(7,11))*(-1);
                     iMayor=i;
                }
            }
            //alert(iMayor+" : "+mayor);
        }
        //empresasNoticias=empresas.slice();
        //alert("Dentro de YQL");
//        $scope.horaCarga=datos.query.created;
            //alert($scope.empresaTop.nombre);
//            localStorage.listaCargada="true";
//alert(empresas.length);
//            sessionStorage.setItem("datosLista",empresas);
//            alert(sessionStorage.datosLista[0].nombre);
            sessionStorage.metodo="actualizar";
            $scope.news=empresas.slice();
            $interval.cancel($scope.marque);
            $timeout(function () {
                    $scope.empresaTop=empresas[iMayor];
                    //$scope.datosLista=empresas;
                    //$scope.empresasNoticias=empresasNoticias;
                    $scope.horaCarga=datos.query.created;
                    //alert($scope.horaCarga);
                    //$rootScope.$broadcast('actualizarLista');
//                    var body = angular.element(document.querySelector('#objectLista')).scope().actualizarLista(empresas);
                    //angular.element(body).scope().actualizarLista(empresas);
                    $scope.init();
                },100);
        //alert(empresas[9].cotizacion+"\n"+empresas[9].cambio+"\n"+empresas[9].rango);
    };
  
  $scope.actualizarLista =  function (listado) {
           $timeout(function () {
//               alert(listado[0].cotizacion);
                 $scope.datosLista=listado;
            },100);
      };
  $scope.obtenerBody= function (listado) {
              angular.element(document.querySelector("#body")).scope().datosLista=listado;  
            };
  
  
  $scope.loadRoster=function(classlist){
    $scope.selectedClass=classlist;
    $scope.activeClass=classlist.class_id;
  };
  
  $scope.cargarDatosEmpresas = function () {
      var url="https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22GOOG%22%2C%22YHOO%22%2C%22MSFT%22%2C%22ORCL%22%2C%22TWTR%22%2C%22CSCO%22%2C%22ADBE%22%2C%22IBM%22%2C%22FB%22%2C%22AAPL%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK";
      $http.jsonp(url)
        .success(function (data) {
            $scope.yqlcallbackdatos(data);          
        });
  };
  

  $scope.itemLista = function ($index) {
    if ($scope.datosLista[$index].cambio.substring(0,0)=="-") {
        $scope.selectedIndex = $index;
    }
  };
  
  $scope.serverSideList = [
    { text: "Español", value: "es" },
    { text: "English", value: "en" },
    { text: "Portugës", value: "pt" },
    { text: "Deutsch", value: "de" }
  ];

  $scope.data = {
    serverSide: 'en'
  };
  
  $scope.serverSideChange = function(item) {
      $scope.cargarIdioma(item.value);
      localStorage.idioma=item.value;
    //console.log("Selected Serverside, text:", item.text, "value:", item.value);
    //window.location.href="#/app/principal";
  };
//  $ionicLoading.hide();
$scope.enviarCorreo = function (correo) {
        location.href='mailto:'+correo;
    };
    
    $scope.showAlert = function() {
         var alertPopup = $ionicPopup.alert({
           title: $scope.textos.conecting2,
           buttons: [
                {text: 'OK', type: 'button-dark'}
          ]
         });
         alertPopup.then(function(res) {
           console.log('Thank you for not eating my delicious ice cream cone');
         });
       };
    
    $scope.cargarIdioma(localStorage.idioma);
    $scope.showPopup = function() {
        var myPopup = $ionicPopup.show({
          title: $scope.textos.conecting,
          buttons: [
                {text: $scope.textos.close,
                    onTap: function(e) {

                    }
                },
                {text: '<b>'+$scope.textos.retry+'</b>',
                 type: 'button-dark',
                    onTap: function(e) {
//                         location.reload();
                        //$scope.checkConnection();
                        $scope.show();
                        $scope.cargarDatosEmpresas();
                    }
                }
          ]
        });
    };
    
    $scope.checkConnection = function(){
        var networkState = navigator.network.connection.type;
    
        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';
        //alert(networkState);
        //alert('Connection type: ' + states[networkState]);
        if(networkState=="none" || networkState=="unknow"){
            $scope.showPopup();
            //alert('Conexión Fallida o Inestable');
        }else{
            $scope.showAlert();
            //alert('Conexión Tipo: '+networkState);
        }
//        document.addEventListener ("offline", onOffline, false);
//        function onOffline() {
//            alert("Entre");
//        }
    };
})
        
.controller('ListCtrl', function($scope,$timeout,$interval,$http,$ionicLoading) {
    
    $scope.datosLista = empresas;
    $scope.textos={};
    $scope.cargarIdioma = function () {
      
      var url="../Lenguajes/"+localStorage.idioma+".json";
      $http.get(url)
        .success(function (data) {
//            alert(data.login);
            //$scope.textos.login=data.login;
            $scope.textos=data;
//            alert($scope.textos.actions);
            //alert("Text :"+$scope.textos.login);
        }); 
   };
     $scope.imprimirValorLista = function () {
              alert($scope.datosLista[0].cotizacion);  
            };  
    
    $scope.yqlcallbackdatos = function (datos) {
    var mayor=0;
    var iMayor=0;
        for (var i = 0; i < datos.query.count; i++) {
             empresas[i].cotizacion=datos.query.results.quote[i].AskRealtime;
             if(empresas[i].cotizacion="0.00"){
                 empresas[i].cotizacion=datos.query.results.quote[i].LastTradePriceOnly;
             }
             var porcentaje = datos.query.results.quote[i].ChangePercentRealtime;
             empresas[i].cambio=datos.query.results.quote[i].ChangeRealtime;
             empresas[i].signo=porcentaje.substring(6,7);
             //alert(porcentaje.substring(7,11));
                    if (empresas[i].signo=="+") {
                        empresas[i].porcentaje=parseFloat(porcentaje.substring(7,11));
                    }
                    else{
                        empresas[i].porcentaje=parseFloat(porcentaje.substring(7,11))*(-1);
                    }
                        
             empresas[i].rango=datos.query.results.quote[i].DaysRange;
//             if (empresas[i].signo=="+") {
//                 if (parseFloat(porcentaje.substring(7,11))>mayor) {
//                     mayor=parseFloat(porcentaje.substring(7,11));
//                     iMayor=i;
//                }
//            }
//            if (empresas[i].signo=="-") {
//                 if (parseFloat(porcentaje.substring(7,11))*(-1)>mayor) {
//                     mayor=parseFloat(porcentaje.substring(7,11))*(-1);
//                     iMayor=i;
//                }
//            }
            //alert(iMayor+" : "+mayor);
        }
        //alert("Dentro de YQL");
//            $scope.empresaTop=empresas[iMayor];
            //alert($scope.empresaTop.nombre);
            localStorage.listaCargada="true";
            $timeout(function () {
                    $scope.datosLista=empresas;
                    //$rootScope.$broadcast('actualizarLista');
//                    var body = angular.element(document.querySelector('#objectLista')).scope().actualizarLista(empresas);
                    //angular.element(body).scope().actualizarLista(empresas);
                },100);
        //alert(empresas[9].cotizacion+"\n"+empresas[9].cambio+"\n"+empresas[9].rango);
    };
    
    $scope.cargarDatosEmpresas = function () {
      var url="https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22GOOG%22%2C%22YHOO%22%2C%22MSFT%22%2C%22ORCL%22%2C%22TWTR%22%2C%22CSCO%22%2C%22ADBE%22%2C%22IBM%22%2C%22FB%22%2C%22AAPL%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK";
      $http.jsonp(url)
        .success(function (data) {
            $scope.yqlcallbackdatos(data);          
        });
  };
    
//    $scope.cargarDatosEmpresas = function () {
//        $timeout(function () {
//                    $scope.datosLista=empresas;
//                },100);
//    };
    
    $scope.actualizarGrafico = function (empresa,nombreEmpresa) {
      //alert(empresa);
        window.parent.cambiarGrafico(empresa,nombreEmpresa);
    };
    
    $scope.hide = function(){
    $ionicLoading.hide();
    };
    
    $scope.show = function() {
    $scope.veces=0;
    $ionicLoading.show({
        //content: 'Loading',
        templateUrl: '../templates/cargando.html',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0 
    });
    
    $interval(function () {
        $scope.veces++;
          if (localStorage.graficoCargado=="true") {
              localStorage.graficoCargado="false";
               $scope.hide();
          }
          if ($scope.veces==99) {
               //alert("Conexión Fallida, verifique su acceso a internet");
               $scope.hide();
          }
     },50,100);
  };
  
    $scope.empezarIntervalo = function () {
        $interval( function () {
//        console.log("Interval");
                if (sessionStorage.metodo=="actualizar") {
                    console.log("Actualizar");
                    sessionStorage.metodo="";
                    $scope.cargarDatosEmpresas();
                    localStorage.listaCargada="true";
                }
            } ,100);
    };
})

.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate) {
 
  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('app.principal');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
})
.controller('PredictionCtrl', function($scope) {

})

.controller('ViabilityCtrl', function($scope, $stateParams,$state,$timeout) {
//    alert($stateParams.sigla);
    $scope.datos = {};
    $scope.prediccion = "";
    $scope.cargarDatos = function () {
                for (var i = 0; i < empresas.length; i++) {
                    if ($stateParams.sigla===empresas[i].sigla) {
                        $scope.datos=empresas[i];
                    }
                }
                if ($scope.datos.sub==="si") {
                    $scope.prediccion="Will be rise";
                }
                else{
                    $scope.prediccion="Will be lower";
                }
                $timeout( function () {
//                    alert($scope.datos.nombre);
                } ,100);
                
    };    
    $scope.previous = function() {
    $state.go("app.prediction");
  };
});

var empresaTop = {};
var empresas = [
    { sigla: 'GOOG', nombre: 'Google Inc.',cotizacion:'',cambio:'',porcentaje:0,rango:'',imagen:'img/google.png',signo:'',probabilidad:0,confianza:0,abrio:"",ask:"",bid:"",prevClose:"",sub:"",volume:""},
    { sigla: 'YHOO', nombre: 'Yahoo Inc.',cotizacion:'',cambio:'',porcentaje:0,rango:'',imagen:'img/yahoo.jpg',signo:'',probabilidad:0,confianza:0,abrio:"",ask:"",bid:"",prevClose:"",sub:"",volume:""},
    { sigla: 'MSFT', nombre: 'Microsoft Corp.',cotizacion:'',cambio:'',porcentaje:0,rango:'',imagen:'img/microsoft.png',signo:'',probabilidad:0,confianza:0,abrio:"",ask:"",bid:"",prevClose:"",sub:"",volume:""},
    { sigla: 'ORCL', nombre: 'Oracle Corp.',cotizacion:'',cambio:'',porcentaje:0,rango:'',imagen:'img/oracle.jpg',signo:'',probabilidad:0,confianza:0,abrio:"",ask:"",bid:"",prevClose:"",sub:"",volume:""},
    { sigla: 'TWTR', nombre: 'Twitter Inc.',cotizacion:'',cambio:'',porcentaje:0,rango:'',imagen:'img/twitter.jpg',signo:'',probabilidad:0,confianza:0,abrio:"",ask:"",bid:"",prevClose:"",sub:"",volume:""},
    { sigla: 'CSCO', nombre: 'Cisco Systems',cotizacion:'',cambio:'',porcentaje:0,rango:'',imagen:'img/cisco.jpg',signo:'',probabilidad:0,confianza:0,abrio:"",ask:"",bid:"",prevClose:"",sub:"",volume:""},
    { sigla: 'ADBE', nombre: 'Adobe Systems',cotizacion:'',cambio:'',porcentaje:0,rango:'',imagen:'img/adobe.png',signo:'',probabilidad:0,confianza:0,abrio:"",ask:"",bid:"",prevClose:"",sub:"",volume:""},
    { sigla: 'IBM', nombre: 'IBM Corp.',cotizacion:'',cambio:'',porcentaje:0,rango:'',imagen:'img/ibm.jpg',signo:'',probabilidad:0,confianza:0,abrio:"",ask:"",bid:"",prevClose:"",sub:"",volume:""},
    { sigla: 'FB', nombre: 'Facebook Inc.',cotizacion:'',cambio:'',porcentaje:0,rango:'',imagen:'img/facebook.png',signo:'',probabilidad:0,confianza:0,abrio:"",ask:"",bid:"",prevClose:"",sub:"",volume:""},
    { sigla: 'AAPL', nombre: 'Apple Inc.',cotizacion:'',cambio:'',porcentaje:0,rango:'',imagen:'img/apple.jpg',signo:'',probabilidad:0,confianza:0,abrio:"",ask:"",bid:"",prevClose:"",sub:"",volume:""}
  ];
  var empresasNoticias = [{ sigla: 'GOOG', nombre: 'Google Inc.',cotizacion:'',cambio:'',porcentaje:0,rango:'',imagen:'img/google.png',signo:''}];
  localStorage.idioma='en';

var datosProb = [
    {subida: {
                psub:0.50266,pmincbaj:0.539,pmincmed:0.433,pmincalt:0.28,pmintbaj:0.029,pmintmed:0.455,pmintalt:0.516,pctbaj:0.286,pctmed:0.564,pctalt:0.150,pcmaxbaj:0.027,pcmaxmed:0.431,pcmaxalt:0.541,ptmaxbaj:0.513,ptmaxmed:0.458,ptmaxcalt:0.029,ptantbaj:0.493,ptantsub:0.507,ptnochebaj:0.516,ptnochesub:0.484
            },
     bajada: {
                pbaj:0.49733,pmincbaj:0.506,pmincmed:0.470,pmincalt:0.023,pmintbaj:0.023,pmintmed:0.458,pmintalt:0.518,pctbaj:0.274,pctmed:0.591,pctalt:0.135,pcmaxbaj:0.023,pcmaxmed:0.469,pcmaxalt:0.508,ptmaxbaj:0.516,ptmaxmed:0.461,ptmaxcalt:0.023,ptantbaj:0.5,ptantsub:0.5,ptnochebaj:0.5,ptnochesub:0.5
          }},
    //Bien
    {bajada: {
                pbaj:0.5065,pmincbaj:0.518,pmincmed:0.46,pmincalt:0.022,pmintbaj:0.033,pmintmed:0.435,pmintalt:0.531,pctbaj:0.277,pctmed:0.575,pctalt:0.147,pcmaxbaj:0.022,pcmaxmed:0.456,pcmaxalt:0.521,ptmaxbaj:0.529,ptmaxmed:0.437,ptmaxcalt:0.034,ptantbaj:0.504,ptantsub:0.495,ptnochebaj:0.461,ptnochesub:0.538
            },
     subida: {
                psub:0.4934,pmincbaj:0.528,pmincmed:0.448,pmincalt:0.024,pmintbaj:0.023,pmintmed:0.439,pmintalt:0.539,pctbaj:0.266,pctmed:0.568,pctalt:0.166,pcmaxbaj:0.023,pcmaxmed:0.445,pcmaxalt:0.532,ptmaxbaj:0.535,ptmaxmed:0.442,ptmaxcalt:0.023,ptantbaj:0.509,ptantsub:0.491,ptnochebaj:0.487,ptnochesub:0.513
          }},
      //Bien
    {subida: {
                psub:0.50266,pmincbaj:0.539,pmincmed:0.433,pmincalt:0.28,pmintbaj:0.029,pmintmed:0.455,pmintalt:0.516,pctbaj:0.286,pctmed:0.564,pctalt:0.150,pcmaxbaj:0.027,pcmaxmed:0.431,pcmaxalt:0.541,ptmaxbaj:0.513,ptmaxmed:0.458,ptmaxcalt:0.029,ptantbaj:0.493,ptantsub:0.507,ptnochebaj:0.516,ptnochesub:0.484
            },
     bajada: {
                pbaj:0.49733,pmincbaj:0.506,pmincmed:0.470,pmincalt:0.023,pmintbaj:0.023,pmintmed:0.458,pmintalt:0.518,pctbaj:0.274,pctmed:0.591,pctalt:0.135,pcmaxbaj:0.023,pcmaxmed:0.469,pcmaxalt:0.508,ptmaxbaj:0.516,ptmaxmed:0.461,ptmaxcalt:0.023,ptantbaj:0.5,ptantsub:0.5,ptnochebaj:0.5,ptnochesub:0.5
          }},
    {subida: {
                psub:0.50266,pmincbaj:0.539,pmincmed:0.433,pmincalt:0.28,pmintbaj:0.029,pmintmed:0.455,pmintalt:0.516,pctbaj:0.286,pctmed:0.564,pctalt:0.150,pcmaxbaj:0.027,pcmaxmed:0.431,pcmaxalt:0.541,ptmaxbaj:0.513,ptmaxmed:0.458,ptmaxcalt:0.029,ptantbaj:0.493,ptantsub:0.507,ptnochebaj:0.516,ptnochesub:0.484
            },
     bajada: {
                pbaj:0.49733,pmincbaj:0.506,pmincmed:0.470,pmincalt:0.023,pmintbaj:0.023,pmintmed:0.458,pmintalt:0.518,pctbaj:0.274,pctmed:0.591,pctalt:0.135,pcmaxbaj:0.023,pcmaxmed:0.469,pcmaxalt:0.508,ptmaxbaj:0.516,ptmaxmed:0.461,ptmaxcalt:0.023,ptantbaj:0.5,ptantsub:0.5,ptnochebaj:0.5,ptnochesub:0.5
          }},
    {subida: {
                psub:0.50266,pmincbaj:0.539,pmincmed:0.433,pmincalt:0.28,pmintbaj:0.029,pmintmed:0.455,pmintalt:0.516,pctbaj:0.286,pctmed:0.564,pctalt:0.150,pcmaxbaj:0.027,pcmaxmed:0.431,pcmaxalt:0.541,ptmaxbaj:0.513,ptmaxmed:0.458,ptmaxcalt:0.029,ptantbaj:0.493,ptantsub:0.507,ptnochebaj:0.516,ptnochesub:0.484
            },
     bajada: {
                pbaj:0.49733,pmincbaj:0.506,pmincmed:0.470,pmincalt:0.023,pmintbaj:0.023,pmintmed:0.458,pmintalt:0.518,pctbaj:0.274,pctmed:0.591,pctalt:0.135,pcmaxbaj:0.023,pcmaxmed:0.469,pcmaxalt:0.508,ptmaxbaj:0.516,ptmaxmed:0.461,ptmaxcalt:0.023,ptantbaj:0.5,ptantsub:0.5,ptnochebaj:0.5,ptnochesub:0.5
          }},
    {subida: {
                psub:0.50266,pmincbaj:0.539,pmincmed:0.433,pmincalt:0.28,pmintbaj:0.029,pmintmed:0.455,pmintalt:0.516,pctbaj:0.286,pctmed:0.564,pctalt:0.150,pcmaxbaj:0.027,pcmaxmed:0.431,pcmaxalt:0.541,ptmaxbaj:0.513,ptmaxmed:0.458,ptmaxcalt:0.029,ptantbaj:0.493,ptantsub:0.507,ptnochebaj:0.516,ptnochesub:0.484
            },
     bajada: {
                pbaj:0.49733,pmincbaj:0.506,pmincmed:0.470,pmincalt:0.023,pmintbaj:0.023,pmintmed:0.458,pmintalt:0.518,pctbaj:0.274,pctmed:0.591,pctalt:0.135,pcmaxbaj:0.023,pcmaxmed:0.469,pcmaxalt:0.508,ptmaxbaj:0.516,ptmaxmed:0.461,ptmaxcalt:0.023,ptantbaj:0.5,ptantsub:0.5,ptnochebaj:0.5,ptnochesub:0.5
          }},
    {subida: {
                psub:0.50266,pmincbaj:0.539,pmincmed:0.433,pmincalt:0.28,pmintbaj:0.029,pmintmed:0.455,pmintalt:0.516,pctbaj:0.286,pctmed:0.564,pctalt:0.150,pcmaxbaj:0.027,pcmaxmed:0.431,pcmaxalt:0.541,ptmaxbaj:0.513,ptmaxmed:0.458,ptmaxcalt:0.029,ptantbaj:0.493,ptantsub:0.507,ptnochebaj:0.516,ptnochesub:0.484
            },
     bajada: {
                pbaj:0.49733,pmincbaj:0.506,pmincmed:0.470,pmincalt:0.023,pmintbaj:0.023,pmintmed:0.458,pmintalt:0.518,pctbaj:0.274,pctmed:0.591,pctalt:0.135,pcmaxbaj:0.023,pcmaxmed:0.469,pcmaxalt:0.508,ptmaxbaj:0.516,ptmaxmed:0.461,ptmaxcalt:0.023,ptantbaj:0.5,ptantsub:0.5,ptnochebaj:0.5,ptnochesub:0.5
          }},
    {subida: {
                psub:0.50266,pmincbaj:0.539,pmincmed:0.433,pmincalt:0.28,pmintbaj:0.029,pmintmed:0.455,pmintalt:0.516,pctbaj:0.286,pctmed:0.564,pctalt:0.150,pcmaxbaj:0.027,pcmaxmed:0.431,pcmaxalt:0.541,ptmaxbaj:0.513,ptmaxmed:0.458,ptmaxcalt:0.029,ptantbaj:0.493,ptantsub:0.507,ptnochebaj:0.516,ptnochesub:0.484
            },
     bajada: {
                pbaj:0.49733,pmincbaj:0.506,pmincmed:0.470,pmincalt:0.023,pmintbaj:0.023,pmintmed:0.458,pmintalt:0.518,pctbaj:0.274,pctmed:0.591,pctalt:0.135,pcmaxbaj:0.023,pcmaxmed:0.469,pcmaxalt:0.508,ptmaxbaj:0.516,ptmaxmed:0.461,ptmaxcalt:0.023,ptantbaj:0.5,ptantsub:0.5,ptnochebaj:0.5,ptnochesub:0.5
          }},
    {subida: {
                psub:0.50266,pmincbaj:0.539,pmincmed:0.433,pmincalt:0.28,pmintbaj:0.029,pmintmed:0.455,pmintalt:0.516,pctbaj:0.286,pctmed:0.564,pctalt:0.150,pcmaxbaj:0.027,pcmaxmed:0.431,pcmaxalt:0.541,ptmaxbaj:0.513,ptmaxmed:0.458,ptmaxcalt:0.029,ptantbaj:0.493,ptantsub:0.507,ptnochebaj:0.516,ptnochesub:0.484
            },
     bajada: {
                pbaj:0.49733,pmincbaj:0.506,pmincmed:0.470,pmincalt:0.023,pmintbaj:0.023,pmintmed:0.458,pmintalt:0.518,pctbaj:0.274,pctmed:0.591,pctalt:0.135,pcmaxbaj:0.023,pcmaxmed:0.469,pcmaxalt:0.508,ptmaxbaj:0.516,ptmaxmed:0.461,ptmaxcalt:0.023,ptantbaj:0.5,ptantsub:0.5,ptnochebaj:0.5,ptnochesub:0.5
          }},
    //Bien
    {subida: {
                psub:0.5070,pmincbaj:0.528,pmincmed:0.444,pmincalt:0.028,pmintbaj:0.019,pmintmed:0.384,pmintalt:0.597,pctbaj:0.259,pctmed:0.550,pctalt:0.191,pcmaxbaj:0.028,pcmaxmed:0.443,pcmaxalt:0.529,ptmaxbaj:0.597,ptmaxmed:0.384,ptmaxcalt:0.019,ptantbaj:0.507,ptantsub:0.493,ptnochebaj:0.434,ptnochesub:0.566
            },
     bajada: {
                pbaj:0.4929,pmincbaj:0.525,pmincmed:0.440,pmincalt:0.035,pmintbaj:0.016,pmintmed:0.405,pmintalt:0.580,pctbaj:0.246,pctmed:0.568,pctalt:0.185,pcmaxbaj:0.035,pcmaxmed:0.440,pcmaxalt:0.526,ptmaxbaj:0.579,ptmaxmed:0.405,ptmaxcalt:0.016,ptantbaj:0.477,ptantsub:0.523,ptnochebaj:0.410,ptnochesub:0.590
          }}
];
var textos={};