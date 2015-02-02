
angular.module('elementBoxApp.element', [
  'elementBoxApp.common'
])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('main.element', {
      url: '/element/:id',
      templateUrl: 'element/element.html',
      controller: 'ElementCtrl'
    });
  }
]);
