
angular.module('elementBoxApp.element.controller', [])

.controller('ElementCtrl', [
          '$scope', '$stateParams', 'Element',
  function($scope,   $stateParams,   Element) {
    var scope = {
      element: Element.get({id: $stateParams.id})
    };

    angular.extend($scope, scope);
  }
]);
