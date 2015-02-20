
angular.module('elementBoxApp.userdetails')

.controller('UserDetailsCtrl', [
          '$scope', '$stateParams', 'UserService',
  function($scope,   $stateParams,   UserService) {
    $scope.user = UserService.get({ id: $stateParams.id });
  }
]);
