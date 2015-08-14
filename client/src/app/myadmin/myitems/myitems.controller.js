
angular.module('elementBoxApp.myadmin.myitems')

.controller('MyItemsCtrl', ['$scope', '$timeout', 'ProductsService', function($scope, $timeout, ProductsService) {
    $scope.products = [];
    $scope.page = 1;
    $scope.pageSize = 3;
    $scope.totalPages = 0;
    $scope.totalProducts = 0;

    $scope.fetchPage = function() {
      if (!$scope.currentUser || !$scope.currentUser.id) {
        $timeout($scope.fetchPage, 500); // waiting for fetching the user data.
        return;
      }
      ProductsService.query({
          userId: $scope.currentUser.id,
          page: $scope.page,
          pageSize: $scope.pageSize
        })
        .$promise.then(function(res) {
          $scope.products = res.results;
          $scope.page = res.page;
          $scope.totalPages = res.totalPages;
          $scope.totalProducts = res.total;
          $scope.pageSize = res.pageSize;
        });
    };

    $scope.$watch('page', function(newVal, oldVal) {
      $scope.fetchPage();
    });

    $scope.fetchPage();
  }
]);
