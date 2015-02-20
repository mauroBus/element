
angular.module('elementBoxApp.userdetails', [])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('main.userdetails', {
      url: '/userdetails/:id',
      templateUrl: 'userdetails/userdetails.html',
      controller: 'UserDetailsCtrl'
    });
  }
]);
