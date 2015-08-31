
angular.module('elementBoxApp.myadmin.allitems')

.controller('AllItemsCtrl', ['$scope', 'ProductsService', function($scope, ProductsService) {
    $scope.products = [];
    $scope.page = 1;
    $scope.pageSize = 3;
    $scope.totalPages = 0;
    $scope.totalProducts = 0;
    $scope.isLoading = false;

    $scope.fetchPage = function() {
      $scope.isLoading = true;

      ProductsService.query({
          page: $scope.page,
          pageSize: $scope.pageSize
        })
        .$promise.then(function(res) {
          $scope.products = res.results;
          $scope.page = res.page;
          $scope.totalPages = res.totalPages;
          $scope.totalProducts = res.total;
          $scope.pageSize = res.pageSize;
          $scope.isLoading = false;
        });
    };

    $scope.$watch('page', function(newVal, oldVal) {
      if ($scope.isLoading) { return; }
      $scope.fetchPage();
    });

    $scope.fetchPage();
  }
]);
