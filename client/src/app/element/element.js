
angular.module('elementBoxApp')

.config([ '$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/element/:dni', {
      templateUrl: 'element/element.html',
      controller: 'ElementCtrl'
      // resolve: {
      //   patient: $rootScope.patients[0]
      // }
    });
  }
]);
