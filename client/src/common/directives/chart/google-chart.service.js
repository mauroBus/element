
angular.module('elementBoxApp.common')

.factory('GoogleChartService', [function() {

  var lib = null;

  var loadChart = function(cb) {
    if (lib) { return angular.isFunction(cb) ? cb() : null; }

    window.$.ajax({
      url: 'https://www.google.com/jsapi',
      dataType: 'script',
      success: function() {
        window.google.load('visualization', '1.0', {
          packages: ['corechart'],
          callback: function() {
            lib = true;
            cb();
          }
        });

        // window.google.setOnLoadCallback(drawChart);
      }
    });
  };

  return {
    loadChart: loadChart
  };

}]);
