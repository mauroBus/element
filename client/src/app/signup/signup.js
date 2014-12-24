
angular.module('elementBoxApp.signup', [
  'elementBoxApp.signup.controller'
])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('signup', {
      url: '/signup',
      templateUrl: 'signup/signup.html',
      controller: 'SignupCtrl'
    });
  }
]);
