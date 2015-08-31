
angular.module('elementBoxApp.account.myitems')

.controller('MyAccountItemsCtrl', [
          '$scope', '$rootScope', '$stateParams', '$filter', '$state', 'ProductsService', 'ModalAlert', 'AUTH_EVENTS',
  function($scope,   $rootScope,   $stateParams,   $filter,   $state,   ProductsService,   ModalAlert,   AUTH_EVENTS) {
    $scope.products = [];
    $scope.page = 1;
    $scope.pageSize = 3;
    $scope.totalPages = 0;
    $scope.totalProducts = 0;
    $scope.isLoading = false;

    $scope.$parent.activeState = $state.current.name;

    $scope.fetchPage = function() {
      $scope.isLoading = true;

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
          $scope.isLoading = false;
        });
    };

    $scope.removeProduct = function(product, index) {
      ModalAlert.alert({
        title: 'Delete product',
        msg: 'Do you want to delete this product? \n\t"' + product.title + '"',
        hasCancel: true
      }).then(function() {
        // UserService
        //   .removeFromWishList({ itemId: wishItem._id })
        product.$remove().$promise.then(function() {
          $scope.fetchPage();
        });
      });
    };

    $scope.$watch('page', function(newVal, oldVal) {
      if ($scope.isLoading) { return; }
      $scope.fetchPage();
    });

    if (!$scope.currentUser || angular.equals({}, $scope.currentUser)) { // no current user.
      $rootScope.$on(AUTH_EVENTS.singinSuccess, function(event, options) {
        $scope.fetchPage();
      });
    } else {
      $scope.fetchPage();
    }

  }
]);
