
angular.module('elementBoxApp.userlist.controller', [])

.controller('UserlistCtrl', [
          '$scope', 'UserlistService', '$location',
  function($scope,   UserlistService,   $location) {
    $scope.users = UserlistService.query();

    $scope.deactivateUser = function(user, index) {
      var u = user;
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
