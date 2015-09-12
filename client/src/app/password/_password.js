
angular.module('elementBoxApp.password', [
  'elementBoxApp.password.forgot',
  'elementBoxApp.password.reset'
])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('main.password', {
      url: '/password',
      templateUrl: 'password/password.html',
      controller: function() {}
    });
  }
]);
