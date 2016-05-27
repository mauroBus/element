
angular.module('elementBoxApp.account.charts')

.controller('MyAccountChartsCtrl', [
          '$scope', '$translate', 'ProductsService',
  function($scope,   $translate,   ProductsService) {

    $scope.chartData = null;
    $scope.chartType = 'pie';

    var setUpChart = function(locales, data) {
      $scope.chartData = {
        columns: [
          { type: 'string', name: locales['ACCOUNT.PRODUCT_NAME']},
          { type: 'number', name: locales['ACCOUNT.PRODUCT_NUMBER_OF_VIEWS']}
        ],
        rows: [],
        options: {
          width: '100%',
          height: 500,
          title: locales['ACCOUNT.PRODUCT_VIEWS'],
          // colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
          is3D: true,
          series: [{color: 'blueviolet'}],
          pieHole: 0.4
        }
      };

      data.forEach(function(row) {
        $scope.chartData.rows.push([
          row.title,
          row.views
        ]);
      });
    };

    $translate([
      'ACCOUNT.PRODUCT_VIEWS',
      'ACCOUNT.PRODUCT_NAME',
      'ACCOUNT.PRODUCT_NUMBER_OF_VIEWS',
      'PRODUCTS'
    ]).then(function(locales) {
      ProductsService.statistics().$promise.then(function(data) {
        setUpChart(locales, data);
      });
    });

    $scope.setType = function(type) {
      $scope.chartType = type;
    };

  }
]);
