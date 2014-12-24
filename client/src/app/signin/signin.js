
angular.module('elementBoxApp.signin', [
  'elementBoxApp.signin.controller'
])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('signin', {
      url: '/signin',
      templateUrl: 'signin/signin.html',
      controller: 'SigninCtrl'
    });
  }
]);
