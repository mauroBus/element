
angular.module('elementBoxApp.common')

.directive('alertMsg', function() {
  return {
    restrict: 'EA',
    transclude: true,
    // replace: true,
    scope: {
      type: '@', // type of bootstrap alert: {default | primary | success | info | warning | danger}
      close: '@', // evaluate to boolean (exists or not)
      timeAlive: '@' // miliseconds to keep alive after auto-close.
    },
    templateUrl: 'directives/alert-msg/alert-msg.html',
    controller: ['$scope', '$attrs', '$timeout', function ($scope, $attrs, $timeout) {
      $scope.closeable = 'close' in $attrs;

      $scope.closeAlert = function() {
        $scope.$destroy();
      };

      if ($scope.timeAlive) {
        var t = Number.parseInt($scope.timeAlive);
        $timeout($scope.closeAlert, t);
      }
    }],
    link: function(scope, el, attrs) {
      scope.$on('$destroy', function() {
        el.remove(); // Only removing the element from the DOM.
      });
    }
  };

});
