
angular.module('elementBoxApp.userlist.controller', [])

.controller('UserlistCtrl', [
          '$scope', 'UserlistService', '$location',
  function($scope,   UserlistService,   $location) {
    $scope.users = [];

    UserlistService.getUsers()
      .then(function(users) {
        $scope.users = users;
      });

    $scope.deleteUser = function(user, index) {
      UserlistService.removeUser(user)
      .then(function() {
        $scope.users.splice(index, 1);
      });
    };
  }
]);
