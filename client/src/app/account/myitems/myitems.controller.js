
angular.module('elementBoxApp.account.myitems')

.controller('MyAccountItemsCtrl', [
          '$scope', '$rootScope', '$stateParams', '$filter', '$state', 'ProductsService', 'ModalAlert', 'AUTH_EVENTS',
  function($scope,   $rootScope,   $stateParams,   $filter,   $state,   ProductsService,   ModalAlert,   AUTH_EVENTS) {
    $scope.products = [];
    $scope.page = 1;
    $scope.pageSize = 3;
    $scope.totalPages = 0;
    $scope.totalProducts = 0;

    $scope.$parent.activeState = $state.current.name;

    $scope.fetchPage = function() {
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

    if (!$scope.currentUser || angular.equals({}, $scope.currentUser)) { // no current user.
      $rootScope.$on(AUTH_EVENTS.singinSuccess, function(event, options) {
        $scope.fetchPage();
      });
    } else {
      $scope.fetchPage();
    }

  }
]);
