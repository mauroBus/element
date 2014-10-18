
angular.module('elementBoxApp')

.controller('HomeCtrl', [
          '$scope', '$rootScope', '$timeout', '$location', 'Element', 'Statistics',
  function($scope,   $rootScope,   $timeout,   $location,   Element,   Statistics) {
    var scope = {
      remove: function(index, $event) {
        var elementToRem = $rootScope.elements[index];
        Element.delete({dni: elementToRem.dni}, function() { // success cbk
          $rootScope.elements.splice(index, 1);
        });

        Statistics.elementRemoved();

        $event.stopPropagation();
      }
    };

    $rootScope.elements = Element.query();

    angular.extend($scope, scope);
  }
]);
