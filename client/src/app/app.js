angular.module('elementBoxApp', [
  // libs:
  'ui.bootstrap',
  'ui.router',
  'ngAnimate',
  // 'nvd3ChartDirectives',
  // template bugs:
  'templates.app', // bag with all the modules html templates
  'templates.common', // bag with all the common html templates
  // common components:
  'elementBoxApp.common',
  // main module:
  'elementBoxApp.main',
  // sub-modules:
  'elementBoxApp.about',
  'elementBoxApp.element',
  'elementBoxApp.error404',
  // 'elementBoxApp.footer',
  // 'elementBoxApp.header',
  'elementBoxApp.home',
  'elementBoxApp.newelement',
  'elementBoxApp.signin',
  'elementBoxApp.signup',
  'elementBoxApp.userlist',
  'elementBoxApp.products'
])

.config(['$urlRouterProvider', function($urlRouterProvider) {
  $urlRouterProvider
    // .when('', '/home')
    .otherwise('/404');
}])

.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.interceptors.push('httpInterceptor');
}]);
