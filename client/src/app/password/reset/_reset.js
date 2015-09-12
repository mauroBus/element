
angular.module('elementBoxApp.password.reset', [])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('main.password.reset', {
      url: '/reset/:token',
      templateUrl: 'password/reset/reset.html',
      controller: 'ResetPassCtrl'
    });

    $stateProvider.state('main.password.reset-invalid', {
      url: '/reset-invalid',
      templateUrl: 'password/reset/reset-invalid.html',
      controller: ['$rootScope', function($rootScope) {
        $rootScope.$emit('title', 'TITLE_RESET_PASS');
      }]
    });
  }
]);
