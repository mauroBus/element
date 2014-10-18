
angular.module('elementBoxApp')

.directive('elementInfo', function(Element, Statistics) {
  return {
    restrict: 'E',
    // transclude: true,
    templateUrl: 'directives/element-info/element-info.html',
    scope: {
      element: '='
    },

    link: function(scope, elem, attrs) {

      scope.editting = false;
      scope.copy = {};

      scope.edit = function() {
        scope.editting = true;
        scope.copy = {
          attr1: scope.element.attr1,
          attr2: scope.element.attr2,
          attr3: scope.element.attr3,
          attr4: scope.element.attr4,
          _id: scope.element._id
        };
      };

      scope.save = function() {
        // scope.element.$update();
        Element.update({id: scope.element._id}, scope.element);
        scope.editting = false;
        // angular.copy(scope.copy, scope.element);

        Statistics.elementUpdated();
      };

      scope.cancelEdition = function() {
        scope.editting = false;
        angular.copy(scope.copy, scope.element);
      };

    }
  };
});
