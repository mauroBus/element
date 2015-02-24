
angular.module('elementBoxApp.common')

.directive('loading', function() {
  return {
    restrict: 'E',
    templateUrl: 'directives/loading/loading.html',
    scope: {
      ballsCount: '@'
    }
  };
});
