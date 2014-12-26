angular.module('elementBoxApp', [
  // libs:
  'ui.bootstrap',
  'ui.router',
  'ngAnimate',
  'nvd3ChartDirectives',
  'templates.app', // bag with all the app templates
  'templates.common', // bag with all the common templates
  // configs:
  'elementBoxApp.common',
  'elementBoxApp.urlConfig',
  // main controller:
  'elementBoxApp.controller',
  // sub-modules:
  'elementBoxApp.about',
  'elementBoxApp.element',
  'elementBoxApp.error404',
  'elementBoxApp.footer',
  'elementBoxApp.header',
  'elementBoxApp.home',
  'elementBoxApp.newelement',
  'elementBoxApp.signin',
  'elementBoxApp.signup',
  'elementBoxApp.userlist'
]);

angular.module('elementBoxApp')

.config(['$urlRouterProvider', function($urlRouterProvider) {
  // when there is an empty route, redirect to /home
  $urlRouterProvider
    .when('', '/home')
    .otherwise('/404');
}])

.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.interceptors.push('httpInterceptor');
}]);
