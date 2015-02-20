
angular.module('elementBoxApp.myadmin.userlist')

.controller('UserlistCtrl', [
          '$scope', 'UserService', '$location',
  function($scope,   UserService,   $location) {
    $scope.page = 1;
    $scope.pageSize = 3;
    $scope.totalPages = 0;
    $scope.totalProducts = 0;
    $scope.users = [];

    $scope.fetchPage = function() {
      UserService.query({
          page: $scope.page,
          pageSize: $scope.pageSize
        })
        .$promise.then(function(res) {
          $scope.users = res.results;
          $scope.page = res.page;
          $scope.pageSize = res.pageSize;
          $scope.totalPages = res.totalPages;
          $scope.totalUsers = res.total;
        });
    };

    $scope.fetchPage();

    $scope.deactivateUser = function(user, index) {
      user.$deactivate(function() {
        user.active = false;
      });
    };

    $scope.activateUser = function(user, index) {
      user.active = true;
      user.$update(function() { // success cbk.
        user.active = true;
      }, function() { // error cbk.
        user.active = false;
      });
    };
  }
]);
