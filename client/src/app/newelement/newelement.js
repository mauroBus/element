
angular.module('elementBoxApp')

.config([ '$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/newelement', {
      templateUrl: 'newelement/newelement.html',
      controller: 'NewElementCtrl'
    });
  }
]);
