angular.module('elementBoxApp.terms', [])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('main.terms', {
      url: '/terms',
      templateUrl: 'terms/terms.html',
      controller: ['$rootScope', function($rootScope) {
        $rootScope.$emit('title', 'TITLE_TERMS_OF_SERVICE');
      }]
    });
  }
]);
