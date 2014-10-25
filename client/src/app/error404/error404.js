
angular.module('elementBoxApp')

.config([ '$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/404', {
      templateUrl: 'error404/error404.html',
      controller: 'Error404Ctrl'
    });
  }
]);
