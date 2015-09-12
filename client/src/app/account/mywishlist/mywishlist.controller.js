
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
        title: 'ACCOUNT.DELETE_WISH_LIST_ITEM_Q',
        msg: 'ACCOUNT.DELETE_WISH_LIST_ITEM_CONFIRM',
        hasCancel: true
      }).then(function() {
        UserService
          .removeFromWishList({ itemId: wishItem._id })
          .$promise.then(function(data) {
            $scope.fetchPage();
            $scope.currentUser.wishList = data.wishList;
          });
      });
    };

    if (!$scope.currentUser || angular.equals({}, $scope.currentUser)) { // no current user.
      // I dont get the idea of this line!!!
      // $rootScope.$on(AUTH_EVENTS.singinSuccess, function(event, options) {
      //   $scope.fetchPage();
      // });
    } else {
      $scope.fetchPage();
    }

  }
]);
