// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.prediction', {
      url: "/prediction",
      views: {
        'menuContent' :{
          templateUrl: "templates/prediction.html"
        }
      }
    })
    .state('app.viability', {
      url: "/viability",
      views: {
        'menuContent' :{
          templateUrl: "templates/viability.html"
        }
      }
    })
    .state('app.about', {
      url: "/about",
      views: {
        'menuContent' :{
          templateUrl: "templates/about.html"
        }
      }
    })
    .state('app.principal', {
      url: "/principal",
      views: {
        'menuContent' :{
          templateUrl: "templates/principal.html",
          controller: 'EmpresasCtrl'
        }
      }
    })
    .state('app.Grafica', {
      url: "/Grafica",
      views: {
        'menuContent' :{
          templateUrl: "templates/Grafica.html"
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/principal');
  
});

angular.module('List', ['ionic'])

.controller('ListsCtrl', function($scope) {
  $scope.listas = [
    { title: 'Apple Inc.', id: 1 },
    { title: 'Yahoo Inc.', id: 2 },
    { title: 'Facebook Inc.', id: 3 },
    { title: 'Ecopetrol', id: 4 },
    { title: 'Isagen', id: 5 },
    { title: 'Dólar - Euro', id: 6 }
  ];
  
  $scope.loadRoster=function(classlist){
    $scope.selectedClass=classlist;
    $scope.activeClass=classlist.class_id;
  };
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('app.list', {
      url: "/list",
      views: {
        'menuContent' :{
          templateUrl: "templates/list.html",
          controller: 'ListsCtrl'
        }
      }
    })
    .state('app.single', {
      url: "/list/:playlistId",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlist.html",
          controller: 'ListsCtrl'
        }
      }
    });
});

