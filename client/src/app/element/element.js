
angular.module('elementBoxApp.element', [
  'elementBoxApp.element.controller',
  'elementBoxApp.common'
])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('element', {
      url: '/element/:id',
      templateUrl: 'element/element.html',
      controller: 'ElementCtrl'
      // resolve: {
      //   patient: $rootScope.patients[0]
      // }
    });
  }
]);
