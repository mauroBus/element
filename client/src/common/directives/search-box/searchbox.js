
angular.module('elementBoxApp.common')

.directive('searchBox', function() {
  return {
    restrict: 'E',
    templateUrl: 'directives/search-box/searchbox.html',
    scope: {
      onSearch: '=',
      api: '='
    },
    controller: ['$scope', function($scope) {
      $scope.searchInput = '';

      $scope.api = $scope.api || {};

      $scope.api.clear = function() {
        $scope.searchInput = '';
      };

      $scope.search = function() {
        var str = $scope.searchInput.trim();
        if (angular.isFunction($scope.onSearch)) {
          $scope.onSearch(str);
        }
      };

      $scope.clearSearch = function() {
        $scope.searchInput = '';
        $scope.search();
      };

    }]

  };
});
