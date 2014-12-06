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
    .state('app.language', {
      url: "/language",
      views: {
        'menuContent' :{
          templateUrl: "templates/language.html"
        }
      }
    })
    .state('app.instruction', {
      url: "/instruction",
      views: {
        'menuContent' :{
          templateUrl: "templates/instruction.html"
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
          controller: 'AppCtrl'
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
    })
    
    .state('app.prediction', {
      url: "/prediction",
      views: {
        'menuContent' :{
          templateUrl: "templates/prediction.html",
          controller: 'PredictionCtrl'
        }
      }
    })

    .state('app.viability', {
      url: "/viability/:sigla",
      views: {
        'menuContent' :{
          templateUrl: "templates/viability.html",
          controller: 'ViabilityCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/principal');
});


