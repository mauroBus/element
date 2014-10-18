angular.module('elementBoxApp', [
  'ui.bootstrap',
  'elementBoxApp.services',
  'elementBoxApp.urlConfig',
  'elementBoxApp.footer',
  'ngRoute',
  // 'ngAnimate',
  'templates.app',
  'templates.common',
  'nvd3ChartDirectives'
]);

angular.module('elementBoxApp')

.config([ '$routeProvider', '$locationProvider',
  function($routeProvider,   $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/home'
      });

    // $locationProvider.html5Mode(true);
  }
]);
