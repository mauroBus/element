
angular.module('elementBoxApp')

.controller('ElementCtrl', [
          '$scope', '$routeParams', 'Element',
  function($scope,   $routeParams,   Element) {
    var scope = {
      element: Element.get({id: $routeParams.id})
    };

    angular.extend($scope, scope);
  }
]);
