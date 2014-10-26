angular.module('elementBoxApp', [
  // libs:
  'ui.bootstrap',
  'ui.router',
  'ngAnimate',
  'nvd3ChartDirectives',
  'templates.app', // bag with all the app templates
  'templates.common', // bag with all the common templates
  // configs:
  'elementBoxApp.services',
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
  'elementBoxApp.login',
  'elementBoxApp.newelement',
  'elementBoxApp.register'
]);

angular.module('elementBoxApp')

.config(['$urlRouterProvider', function($urlRouterProvider){
    // when there is an empty route, redirect to /home
    $urlRouterProvider
      .when('', '/home');
      // .otherwise('/error404');
}]);


// .config([ '$stateProvider', '$locationProvider',
//   function($stateProvider,   $locationProvider) {
//     $stateProvider
//       .state('/', {
//         url: '/',
//         templateUrl: 'home/home.html',
//         controller: 'HomeCtrl'
//         // reloadOnSearch: false
//       });
//       // .otherwise({
//       //   redirectTo: '/404'
//       // });

//     // $locationProvider.html5Mode(true);
//   }
// ]);
