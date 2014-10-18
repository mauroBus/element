
angular.module('elementBoxApp.footer', [
  'nvd3ChartDirectives',
  'templates.app',
  'templates.common'
])

.controller('FooterController', [
          '$scope', '$route', '$routeParams', '$location', 'Statistics',
  function($scope,   $route,   $routeParams,   $location,   Statistics) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;

    $scope.statistics = Statistics.getData();
    $scope.xFunction = Statistics.xFunction;
    $scope.yFunction = Statistics.yFunction;

    $scope.donut = true;
    $scope.description = Statistics.description;
  }
]);
