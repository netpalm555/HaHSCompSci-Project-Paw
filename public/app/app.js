var app = angular.module('myApp', ['ui.router', 'myApp.controllers', 'myApp.factories', 'myApp.filters']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    console.log('redirecting');
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: "partials/home.html",
        controller: 'HomeCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: "partials/login.html"
      })
      .state('register', {
        url: '/register',
        templateUrl: "partials/register.html"
      });
    $urlRouterProvider.otherwise('/');
  }
]);
