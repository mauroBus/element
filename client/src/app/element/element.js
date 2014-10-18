
angular.module('elementBoxApp')

.config([ '$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/element/:id', {
      templateUrl: 'element/element.html',
      controller: 'ElementCtrl'
      // resolve: {
      //   patient: $rootScope.patients[0]
      // }
    });
  }
]);
