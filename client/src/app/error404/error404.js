
angular.module('elementBoxApp.error404', [
  'elementBoxApp.error404.controller'
])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('404', {
      url: '/404',
      templateUrl: 'error404/error404.html',
      controller: 'Error404Ctrl'
    });
  }
]);
