
angular.module('elementBoxApp.password.forgot', [])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('main.password.forgot', {
      url: '/forgot',
      templateUrl: 'password/forgot/forgot.html',
      controller: 'ForgotPassCtrl'
    });
  }
]);
