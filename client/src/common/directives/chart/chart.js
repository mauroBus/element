
angular.module('elementBoxApp.common')

.directive('chart', ['GoogleChartService', function(GoogleChartService) {
  return {
    restrict: 'EA',
    scope: {
      data: '=',
      type: '='
    },
    template: '<div class="chart"><loading balls-count="4"></loading></div>',
    link: function(scope, el, attrs) {

      scope.libReady = false;

      var drawChart = function() {
        var chartData = new window.google.visualization.DataTable();
        // var chartData = new window.google.visualization.arrayToDataTable([['Element', 'Density', { role: 'style' }]]);
        scope.data.columns.forEach(function(col) {
          chartData.addColumn(col.type, col.name);
        });
        // chartData.addColumn('number', 'Slices');
        chartData.addRows(scope.data.rows);

        // Set chart options
        var defaultOptions = {
          title: 'Chart',
          width: 400,
          height: 300
       };

       var chartType = scope.type === 'pie' ? 'PieChart' : 'BarChart';

        // Instantiate and draw our chart, passing in some options.
        var chart = new window.google.visualization[chartType](el.find('.chart')[0]);
        chart.draw(chartData, angular.extend({}, defaultOptions, scope.data.options));
      };

      GoogleChartService.loadChart(function(lib) {
        scope.libReady = true;
        if (scope.data) {
          drawChart();
        }
      });

      scope.$watch('data', function(newVal, oldVal) {
        if (scope.libReady && scope.data) {
          drawChart();
        }
      });

      scope.$watch('type', function(newVal, oldVal) {
        drawChart();
      });

    }
  };

}]);