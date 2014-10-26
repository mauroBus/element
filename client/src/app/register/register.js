
angular.module('elementBoxApp.register', [
  'elementBoxApp.register.controller'
])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('register', {
      url: '/register',
      templateUrl: 'register/register.html',
      controller: 'RegisterCtrl'
    });
  }
]);
