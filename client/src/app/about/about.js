angular.module('elementBoxApp.about', [
  'elementBoxApp.about.controller'
])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('about', {
      url: '/about',
      templateUrl: 'about/about.html',
      controller: 'AboutCtrl'
    });
  }
]);
