
angular.module('elementBoxApp.signup', [])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('main.signup', {
      url: '/signup',
      templateUrl: 'signup/signup.html',
      controller: 'SignupCtrl'
    });
  }
]);
