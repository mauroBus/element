
angular.module('elementBoxApp.home')

.controller('FilterCtrl', [
          '$scope', '$rootScope',
  function($scope,   $rootScope) {
    $rootScope.searchTxt = '';
    $scope.searchTxt = '';

    $scope.filter = function() {
      $rootScope.searchTxt = $scope.searchTxt;
    };

    $scope.clearFilter = function() {
      $rootScope.searchTxt = $scope.searchTxt = '';
    };
  }
]);
