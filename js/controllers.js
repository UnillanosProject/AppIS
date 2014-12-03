angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$interval,$http,$templateCache,$ionicLoading,$state) {
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
                }
                if ($scope.veces==199) {
                $scope.hide();
                //Aqui se puede poner algo que avise que no hay conexión a internet
            } 
     },50,200);
  };
  
   $scope.show2 = function() {
      $scope.veces=0;
    $ionicLoading.show({
        //content: 'Loading',
        templateUrl: 'templates/cargando.html',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });
   }
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
//      $scope.checkConnection();
      //document.getElementById('botonCargar').className="button button-icon button-energized icon ion-refreshing";
      $scope.show2();
      $scope.cargarDatosEmpresas();
      $interval(function () {
          if (localStorage.listaCargada=="true") {
              $scope.hide();
               //document.getElementById('botonCargar').className="button button-icon button-energized icon ion-refresh";
               localStorage.listaCargada="false";
               //$scope.init();
          }   
     },75,200);
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
    
    
    $scope.init = function() {
        /*$http.post('the_news_file.json', null).success(function(data) {
            if (data && data.length > 0) {*/
                $scope.news = empresasNoticias;
                $interval($scope.news_move ,0);
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
        empresasNoticias=empresas.slice();
        //alert("Dentro de YQL");
//        $scope.horaCarga=datos.query.created;
            //alert($scope.empresaTop.nombre);
//            localStorage.listaCargada="true";
//alert(empresas.length);
//            sessionStorage.setItem("datosLista",empresas);
//            alert(sessionStorage.datosLista[0].nombre);
            sessionStorage.metodo="actualizar";
            $timeout(function () {
                    $scope.empresaTop=empresas[iMayor];
                    //$scope.datosLista=empresas;
                    $scope.empresasNoticias=empresasNoticias;
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
        alert('Connection type: ' + states[networkState]);
        if(networkState=="none"){
            alert('Conexión Fallida o Inestable');
        }else{
            alert('Conexión Exitosa');
        }
//        document.addEventListener ("offline", onOffline, false);
//        function onOffline() {
//            alert("Entre");
//        }
        //localStorage.network=networkState;
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
});

var empresaTop = {};
var empresas = [
    { sigla: 'GOOG', nombre: 'Google Inc.',cotizacion:'',cambio:'',porcentaje:0,rango:'',imagen:'../img/google.png',signo:''},
    { sigla: 'YHOO', nombre: 'Yahoo Inc.',cotizacion:'',cambio:'',porcentaje:0,rango:'',imagen:'../img/yahoo.jpg',signo:''},
    { sigla: 'MSFT', nombre: 'Microsoft Corp.',cotizacion:'',cambio:'',porcentaje:0,rango:'',imagen:'../img/microsoft.png',signo:''},
    { sigla: 'ORCL', nombre: 'Oracle Corp.',cotizacion:'',cambio:'',porcentaje:0,rango:'',imagen:'../img/oracle.jpg',signo:''},
    { sigla: 'TWTR', nombre: 'Twitter Inc.',cotizacion:'',cambio:'',porcentaje:0,rango:'',imagen:'../img/twitter.jpg',signo:''},
    { sigla: 'CSCO', nombre: 'Cisco Systems',cotizacion:'',cambio:'',porcentaje:0,rango:'',imagen:'../img/cisco.jpg',signo:''},
    { sigla: 'ADBE', nombre: 'Adobe Systems',cotizacion:'',cambio:'',porcentaje:0,rango:'',imagen:'../img/adobe.png',signo:''},
    { sigla: 'IBM', nombre: 'IBM Corp.',cotizacion:'',cambio:'',porcentaje:0,rango:'',imagen:'../img/ibm.jpg',signo:''},
    { sigla: 'FB', nombre: 'Facebook Inc.',cotizacion:'',cambio:'',porcentaje:0,rango:'',imagen:'../img/facebook.png',signo:''},
    { sigla: 'AAPL', nombre: 'Apple Inc.',cotizacion:'',cambio:'',porcentaje:0,rango:'',imagen:'../img/apple.jpg',signo:''}
  ];
  var empresasNoticias = [{ sigla: 'GOOG', nombre: 'Google Inc.',cotizacion:'',cambio:'',porcentaje:0,rango:'',imagen:'../img/google.png',signo:''}];
  localStorage.idioma='en';
