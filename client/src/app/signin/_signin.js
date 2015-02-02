
angular.module('elementBoxApp.signin', [])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('main.signin', {
      url: '/signin',
      templateUrl: 'signin/signin.html',
      controller: 'SigninCtrl'
    });
  }
]);
