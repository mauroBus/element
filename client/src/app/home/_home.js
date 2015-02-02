
angular.module('elementBoxApp.home', [])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('main.home', {
      url: '/home',
      templateUrl: 'home/home.html',
      controller: 'HomeCtrl'
      // reloadOnSearch: false
    });
  }
]);
