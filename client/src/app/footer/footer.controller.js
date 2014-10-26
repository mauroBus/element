
angular.module('elementBoxApp.footer', [
  'nvd3ChartDirectives',
  'templates.app',
  'templates.common'
])

.controller('FooterController', [
          '$scope', '$state', '$stateParams', '$location', 'Statistics',
  function($scope,   $state,   $stateParams,   $location,   Statistics) {
    $scope.$state = $state;
    $scope.$location = $location;
    $scope.$stateParams = $stateParams;

    $scope.statistics = Statistics.getData();
    $scope.xFunction = Statistics.xFunction;
    $scope.yFunction = Statistics.yFunction;

    $scope.donut = true;
    $scope.description = Statistics.description;
  }
]);
