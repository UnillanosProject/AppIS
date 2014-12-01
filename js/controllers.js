angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

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
})
.controller('LoadingCtrl', function($scope, $ionicLoading) {
  $scope.show = function() {
//    $ionicLoading.show({
//        content: 'Loading',
//        animation: 'fade-in',
//        showBackdrop: true,
//        maxWidth: 200,
//        showDelay: 0
//    });
  };
  $scope.hide = function(){
    $ionicLoading.hide();
  };
})
.controller('ControllerRefresh', function($scope, $http) {
  $scope.doRefresh = function() {
      alert('Fuera de get');
    $http.get('')
     .success(function() {
         alert('Dentro de get');
     })
     .finally(function() {
     });
  };
  })
  .controller('BotonCtrl', function($scope) {
  $scope.cargar = function() {
      document.getElementById('botonCargar').className="button button-icon button-energized icon ion-refreshing";
  };
  });

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

function EmpresasCtrl($scope, /*$http,*/ $interval) {
    $scope.empresas = empresas;
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
                $scope.news = empresas;
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
}

angular.module('List.controllers', [])
//.controller('ListsCtrl', function($scope,$ionicLoading) {
 .controller('ListsCtrl', function($scope,$timeout,$interval) {
//    $ionicLoading.show({
//	    content: 'Loading Data',
//	    animation: 'fade-in',
//	    showBackdrop: false,
//	    maxWidth: 200,
//	    showDelay: 500
//	});
  $scope.datosLista = empresas;
  $scope.actualizarLista = function () {
         $scope.datosLista = empresas;
         //$scope.$broadcast('scroll.refreshComplete');
         //alert(datosLista[9].cotizacion);
         //location.href=document.URL;
         //window.parent.actualizarLista();
         //alert('Mostrar gráfica');
         //tempAlert('Cargando datos del servidor',3000);
   };
   var intervalo;
   $scope.doRefresh = function() {
    console.log('Refreshing!');
       //for (i = 0; i < 70; i++) {
       //if ( angular.isDefined(intervalo) ) return;
        intervalo = $interval( function() {
      //simulate async response
           console.log("En el intervalo, local Storage="+localStorage.listaCargada);
//            if (localStorage.listaCargada===true) {
//                listaCargada=true;
//                //localStorage.listaCargada=false;
//            }
//           if (localStorage.listaCargada==true) {
//               console.log('Terminado');
//                //Stop the ion-refresher from spinning
////                $scope.$broadcast('scroll.refreshComplete');
//                listaCargada=true;
//                localStorage.listaCargada=false;
//                $scope.pararIntervalo();
//               $scope.datosLista = empresas;
//           }
        }, 50,100,true);
         $timeout (function () {
             //alert(localStorage.listaCargada);
             if (localStorage.listaCargada=="false") {
              alert('No se ha podido cargar el listado');
              }
              else{
                  localStorage.listaCargada="false";
              }
           },6000);
      //}
  };
  
  $scope.pararIntervalo = function() {
        if (angular.isDefined(intervalo)) {
          $interval.cancel(intervalo);
          intervalo = undefined;
        }
    };
  
  $scope.actualizarGrafico = function (empresa,nombreEmpresa) {
      //alert(empresa);
        window.parent.cambiarGrafico(empresa,nombreEmpresa);
    };
  
  $scope.loadRoster=function(classlist){
    $scope.selectedClass=classlist;
    $scope.activeClass=classlist.class_id;
  };
  
  $scope.cargarDatosEmpresas = function () {
      document.getElementById('scriptList').src="https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22GOOG%22%2C%22YHOO%22%2C%22MSFT%22%2C%22ORCL%22%2C%22TWTR%22%2C%22CSCO%22%2C%22ADBE%22%2C%22IBM%22%2C%22FB%22%2C%22AAPL%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=yqlcallbackdatos";
  };
  

  $scope.itemLista = function ($index) {
    if ($scope.datosLista[$index].cambio.substring(0,0)=="-") {
        $scope.selectedIndex = $index;
    }
  }; 
//  $ionicLoading.hide();
});

var empresaTop = { sigla: 'GOOG', nombre: 'Google Inc.',cotizacion:'575',cambio:'0.38',rango:'58%',imagen:'../img/google.png',signo:''};
var empresas = [
    { sigla: 'GOOG', nombre: 'Google Inc.',cotizacion:'',cambio:'',rango:'',imagen:'../img/google.png',signo:''},
    { sigla: 'YHOO', nombre: 'Yahoo Inc.',cotizacion:'',cambio:'',rango:'',imagen:'../img/yahoo.jpg',signo:''},
    { sigla: 'MSFT', nombre: 'Microsoft Corp.',cotizacion:'',cambio:'',rango:'',imagen:'../img/microsoft.png',signo:''},
    { sigla: 'ORCL', nombre: 'Oracle Corp.',cotizacion:'',cambio:'',rango:'',imagen:'../img/oracle.jpg',signo:''},
    { sigla: 'TWTR', nombre: 'Twitter Inc.',cotizacion:'',cambio:'',rango:'',imagen:'../img/twitter.jpg',signo:''},
    { sigla: 'CSCO', nombre: 'Cisco Systems',cotizacion:'',cambio:'',rango:'',imagen:'../img/cisco.jpg',signo:''},
    { sigla: 'ADBE', nombre: 'Adobe Systems',cotizacion:'',cambio:'',rango:'',imagen:'../img/adobe.png',signo:''},
    { sigla: 'IBM', nombre: 'IBM Corp.',cotizacion:'',cambio:'',rango:'',imagen:'../img/ibm.jpg',signo:''},
    { sigla: 'FB', nombre: 'Facebook Inc.',cotizacion:'',cambio:'',rango:'',imagen:'../img/facebook.png',signo:''},
    { sigla: 'AAPL', nombre: 'Apple Inc.',cotizacion:'',cambio:'',rango:'',imagen:'../img/apple.jpg',signo:''}
  ];