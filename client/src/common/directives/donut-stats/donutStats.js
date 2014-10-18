
angular.module('elementBoxApp')

.directive('donutStats', function(Statistics) {
  return {
    restrict: 'E',
    templateUrl: 'directives/donut-stats/donut-stats.html',
    scope: {
      width: '=',
      height: '='
    },
    link: function(scope, elem, attrs) {
      scope.statistics = Statistics.getData();
      scope.xFunction = Statistics.xFunction;
      scope.yFunction = Statistics.yFunction;

      scope.donut = true;
      scope.description = Statistics.description;
      scope.tooltipContent = Statistics.tooltipContent;
    }
  };
});
