angular.module('elementBoxApp', [
  // * libs:
  'ui.bootstrap',
  'ui.router',
  'ngAnimate',
  'ngProgress',
  'ngCookies',
  'pascalprecht.translate',
  // 'nvd3ChartDirectives',
  // * template bugs:
  'templates.app', // bag with all the modules html templates
  'templates.common', // bag with all the common html templates
  // * common components:
  'elementBoxApp.common',
  // * app controller:
  'elementBoxApp.controller',
  // * main module:
  'elementBoxApp.main',
  // * sub-modules:
  'elementBoxApp.about',
  'elementBoxApp.terms',
  'elementBoxApp.error404',
  'elementBoxApp.home',
  'elementBoxApp.signin',
  'elementBoxApp.signup',
  'elementBoxApp.signout',
  'elementBoxApp.products',
  'elementBoxApp.myadmin',
  'elementBoxApp.account',
  'elementBoxApp.userdetails',
  'elementBoxApp.password',
])

.config(['$urlRouterProvider', function($urlRouterProvider) {
  $urlRouterProvider
    // .when('', '/home')
    .otherwise('/404');
}])

.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.interceptors.push('httpInterceptor');
}])


.factory('$exceptionHandler', function() {
  return function(exception, cause) {
    // exception.message += ' (caused by "' + cause + '")';

    window.ga('send', 'exception', {
      exDescription: exception.message,
      exFatal: true,
      exception: exception,
      message: exception.file + '(' + exception.line + ':' + exception.col + '): ' + exception.message
    });
  };
})

// Configs for translate plugin:
.config(['$translateProvider', function ($translateProvider) {
  $translateProvider.useStaticFilesLoader({
    prefix: 'locales/locale-',
    suffix: '.json'
  });

  $translateProvider.preferredLanguage('es');
  $translateProvider.useCookieStorage();
  $translateProvider.useSanitizeValueStrategy('escaped');
}])

// .config([function () {
//   window.onerror = function(message, file, line, col, exception) {
//     console.log(exception.stack);

//     window.ga('send', 'exception', {
//       exDescription: exception.message,
//       exFatal: true,
//       exception: exception,
//       message: file + '(' + line + ':' + col + '): ' + message
//     });
//   };
// }])



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
