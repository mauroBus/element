
angular.module('elementBoxApp.main', [])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('main', {
      url: '',
      templateUrl: 'main/main.html',
      controller: 'MainCtrl'
    });
  }
]);
