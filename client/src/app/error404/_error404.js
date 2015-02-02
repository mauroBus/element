
angular.module('elementBoxApp.error404', [])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('main.404', {
      url: '/404',
      templateUrl: 'error404/error404.html',
      controller: 'Error404Ctrl'
    });
  }
]);
