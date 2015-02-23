angular.module('elementBoxApp.terms', [])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('main.terms', {
      url: '/terms',
      templateUrl: 'terms/terms.html',
      controller: function() {}
    });
  }
]);
