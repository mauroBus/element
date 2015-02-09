
angular.module('elementBoxApp.myadmin.myitems')

.controller('MyItemsCtrl', [
          '$scope', '$rootScope', '$stateParams', '$filter', 'ProductsService', 'Categories',
  function($scope,   $rootScope,   $stateParams,   $filter,   ProductsService,   Categories) {
    $scope.products = [];
    $scope.page = 1;
    $scope.pageSize = 3;
    $scope.totalPages = 0;
    $scope.totalProducts = 0;

    $scope.fetchPage = function() {
      ProductsService.query({
          'user.ref': $scope.currentUser.id,
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

    $scope.fetchPage();

  }
]);
