angular.module('elementBoxApp.signout')

.directive('parallax', function() {
  return {
    restrict: 'AE',
    transclude: true,
    scope: {
      elements: '='
    },
    template: '<div><ng-transclude /></div>',
    link: function(scope, elem, attrs) {
      scope.elements = scope.elements || [];
      scope.elements.forEach(function(selector) {
        elem.find(selector).plaxify();
      });
      window.$.plax.enable();

      scope.$on('$destroy', function (event) {
        // window.$.plax.disable({ clearLayers: true });
        // window.$.plax.disable();
      });
    }
  };
});
