
angular.module('elementBoxApp.newelement', [
  'elementBoxApp.newelement.controller'
])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('newelement', {
      url: '/newelement',
      templateUrl: 'newelement/newelement.html',
      controller: 'NewElementCtrl'
    });
  }
]);
