
angular.module('elementBoxApp.home', [
  'elementBoxApp.home.controller'
])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('home', {
      url: '/home',
      templateUrl: 'home/home.html',
      controller: 'HomeCtrl'
      // reloadOnSearch: false
    });
  }
]);
