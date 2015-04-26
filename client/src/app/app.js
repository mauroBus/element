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
  // app controller:
  'elementBoxApp.controller',
  // main module:
  'elementBoxApp.main',
  // sub-modules:
  'elementBoxApp.about',
  'elementBoxApp.terms',
  'elementBoxApp.element',
  'elementBoxApp.error404',
  // 'elementBoxApp.footer',
  // 'elementBoxApp.header',
  'elementBoxApp.home',
  'elementBoxApp.newelement',
  'elementBoxApp.signin',
  'elementBoxApp.signup',
  // 'elementBoxApp.userlist',
  'elementBoxApp.products',
  'elementBoxApp.myadmin',
  'elementBoxApp.account',
  'elementBoxApp.userdetails',
])

.config(['$urlRouterProvider', function($urlRouterProvider) {
  $urlRouterProvider
    // .when('', '/home')
    .otherwise('/404');
}])

.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.interceptors.push('httpInterceptor');
}])


// /*** To Refresh URL without reloading the controllers: ***/
// .config(['$urlRouterProvider', function ($urlRouterProvider) {
//   $urlRouterProvider.deferIntercept();
// }])
// .run(['$rootScope', '$urlRouter', '$location', '$state', function ($rootScope, $urlRouter, $location, $state) {
//   $rootScope.$on('$locationChangeSuccess', function(e, newUrl, oldUrl) {
//     e.preventDefault();
//     if ($state.current.name !== 'main.products.list') {
//       $urlRouter.sync();
//     }
//   });

//   $urlRouter.listen();
// }])

;
