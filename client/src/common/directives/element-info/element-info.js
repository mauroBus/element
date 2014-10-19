
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
          title: scope.element.title,
          content: scope.element.content,
          created: scope.element.created,
          date: scope.element.date,
          like: scope.element.like,
          dontLike: scope.element.dontLike,
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
