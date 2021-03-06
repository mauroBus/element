
angular.module('elementBoxApp.account.myemails')

.controller('MyAccountEmailsCtrl', [
          '$scope', '$rootScope', '$stateParams', '$filter', '$state', 'ProductsService', 'ModalAlert', 'AUTH_EVENTS',
  function($scope,   $rootScope,   $stateParams,   $filter,   $state,   ProductsService,   ModalAlert,   AUTH_EVENTS) {
    $scope.products = [];
    $scope.page = 1;
    $scope.pageSize = 3;
    $scope.totalPages = 0;
    $scope.totalProducts = 0;

    $scope.fetchPage = function() {
      // ProductsService.query({
      //     'user.ref': $scope.currentUser.id,
      //     page: $scope.page,
      //     pageSize: $scope.pageSize
      //   })
      //   .$promise.then(function(res) {
      //     $scope.products = res.results;
      //     $scope.page = res.page;
      //     $scope.totalPages = res.totalPages;
      //     $scope.totalProducts = res.total;
      //     $scope.pageSize = res.pageSize;
      //   });
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
