angular.module('elementBoxApp.about', [])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('main.about', {
      url: '/about',
      templateUrl: 'about/about.html',
      controller: 'AboutCtrl'
    });
  }
]);
