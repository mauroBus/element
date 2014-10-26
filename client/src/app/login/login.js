
angular.module('elementBoxApp.login', [
  'elementBoxApp.login.controller'
])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('login', {
      url: '/login',
      templateUrl: 'login/login.html',
      controller: 'LoginCtrl'
    });
  }
]);
