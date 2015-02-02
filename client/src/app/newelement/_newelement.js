
angular.module('elementBoxApp.newelement', [])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('main.newelement', {
      url: '/newelement',
      templateUrl: 'newelement/newelement.html',
      controller: 'NewElementCtrl'
    });
  }
]);
