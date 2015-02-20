
angular.module('elementBoxApp.myadmin.allitems')

.controller('AllItemsCtrl', [
          '$scope', '$rootScope', '$stateParams', '$filter', 'ProductsService', 'Categories',
  function($scope,   $rootScope,   $stateParams,   $filter,   ProductsService,   Categories) {
    $scope.products = [];
    $scope.page = 1;
    $scope.pageSize = 3;
    $scope.totalPages = 0;
    $scope.totalProducts = 0;

    $scope.fetchPage = function() {
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
        });
    };

    $scope.$watch('page', function(newVal, oldVal) {
      $scope.fetchPage();
    });

    $scope.removeProduct = function(prod) {
      prod.$remove(function() {
        $scope.fetchPage();
      });
    };

    $scope.fetchPage();
  }
]);
