
angular.module('elementBoxApp.common')

.directive('elementInfo', ['Element', '$rootScope', function(Element, $rootScope) {
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
        angular.extend(scope.copy, scope.element);
      };

      scope.save = function() {
        var newData = {
          title: scope.copy.title,
          content: scope.copy.content,
          created: scope.copy.created,
          date: scope.copy.date,
          like: scope.copy.like,
          dontLike: scope.copy.dontLike
        };

        // scope.element.$update();
        Element.update({id: scope.element._id}, newData, function() { // success cbk.
          angular.extend(scope.element, newData);
          scope.editting = false;
        });
      };

      scope.cancelEdition = function() {
        scope.editting = false;
        scope.copy = {};
      };

    }
  };
}]);
