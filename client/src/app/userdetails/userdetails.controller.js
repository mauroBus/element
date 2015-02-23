
angular.module('elementBoxApp.userdetails')

.controller('UserDetailsCtrl', [
          '$scope', '$stateParams', 'UserService', 'ProductsService',
  function($scope,   $stateParams,   UserService,   ProductsService) {
    var page = 1;
    var pageSize = 6;
    $scope.user = UserService.get({ id: $stateParams.id });
    $scope.ownProducts = [];
    $scope.totalProducts = 0;
    $scope.userReported = false;

    var fetchProducts = function(page, pageSize) {
      ProductsService.get({ userId: $stateParams.id, page: page, pageSize: pageSize }, function(data) {
        Array.prototype.push.apply($scope.ownProducts, data.results);
        $scope.totalProducts = data.total;
      });
    };

    $scope.showMoreProducts = function() {
      fetchProducts(++page, pageSize);
    };

    $scope.reportUser = function() {
      // TODO:
      // UserService.report({ _id: $scope.user._id });
      $scope.userReported = true;
    };

    $scope.undoReportUser = function() {
      // TODO:
      // UserService.undoReport({ _id: $scope.user._id });
      $scope.userReported = false;
    };

    fetchProducts(page, pageSize);
  }
])

// Filter to partialy hide phone number:
.filter('hidePhone', function() {
  return function(input) {
    return input ? new Array(input.length - 2).join('▒') + input.substr(input.length - 2) : '';
  };
})
;