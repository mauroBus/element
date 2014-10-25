angular.module('elementBoxApp', [
  'ui.bootstrap',
  'elementBoxApp.services',
  'elementBoxApp.urlConfig',
  'elementBoxApp.footer',
  'ngRoute',
  'ngAnimate',
  'templates.app',
  'templates.common',
  'nvd3ChartDirectives'
]);

angular.module('elementBoxApp')

.config([ '$routeProvider', '$locationProvider',
  function($routeProvider,   $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
        // reloadOnSearch: false
      })
      .otherwise({
        redirectTo: '/404'
      });

    // $locationProvider.html5Mode(true);
  }
]);
