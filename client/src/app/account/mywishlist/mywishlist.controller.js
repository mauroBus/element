
angular.module('elementBoxApp.account.mywishlist')

.controller('MyWishListCtrl', [
          '$scope', '$rootScope', '$state', 'UserService', 'ModalAlert', 'AUTH_EVENTS',
  function($scope,   $rootScope,   $state,   UserService,   ModalAlert,   AUTH_EVENTS) {
    $scope.wishList = [];
    $scope.page = 1;
    $scope.pageSize = 3;
    $scope.totalPages = 0;
    $scope.totalItems = 0;
    $scope.isLoading = false;

    $scope.$parent.activeState = $state.current.name;

    $scope.fetchPage = function() {
      $scope.isLoading = true;
      UserService.queryWishList({
          page: $scope.page,
          pageSize: $scope.pageSize
        })
        .$promise.then(function(res) {
          $scope.wishList = res.results;
          $scope.page = res.page;
          $scope.totalPages = res.totalPages;
          $scope.totalItems = res.total;
          $scope.pageSize = res.pageSize;
          $scope.isLoading = false;
        });
    };

    $scope.$watch('page', function(newVal, oldVal) {
      if ($scope.isLoading) { return; }
      $scope.fetchPage();
    });

    $scope.removeFromWishList = function(wishItem, index) {
      ModalAlert.alert({
        title: 'Delete Wish List item',
        msg: 'Do you want to delete it from Wish List?',
        hasCancel: true
      }).then(function() {
        UserService
          .removeFromWishList({ itemId: wishItem._id })
          .$promise.then(function() {
            $scope.fetchPage();
          });
      });
    };

    if (!$scope.currentUser || angular.equals({}, $scope.currentUser)) { // no current user.
      $rootScope.$on(AUTH_EVENTS.singinSuccess, function(event, options) {
        $scope.fetchPage();
      });
    } else {
      $scope.fetchPage();
    }

  }
]);
