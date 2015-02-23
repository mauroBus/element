
angular.module('elementBoxApp.common')

.directive('comment', function() {
  return {
    restrict: 'E',
    templateUrl: 'directives/comment/comment.html',
    transclude: true,
    scope: {
      comment: '=',
      separator: '=',
      extraData: '='
    }
  };
});
