
angular.module('elementBoxApp.account.settings')

.controller('MyAccountSettingsCtrl', [
          '$scope', 'UserService', 'Session',
  function($scope,   UserService,   Session) {
    $scope.currentPassword = '';
    $scope.newPassword = '';
    $scope.verifyPassword = '';
    $scope.errors = {};
    $scope.showSuccessMsg = false;
    $scope.showErrorMsg = false;
    $scope.showErrors = false;
    $scope.success = false;

    $scope.changePass = function() {
      $scope.showErrors = true;

      if ($scope.newPassword !== $scope.verifyPassword) {
        $scope.showErrorMsg = true;
        return;
      }

      if ($scope.currentPassword === '' || $scope.newPassword === '' || $scope.verifyPassword === '') {
        return;
      }

      $scope.showSuccessMsg = $scope.showErrorMsg = false;

      UserService.changePass({
          currentPassword: $scope.currentPassword,
          newPassword: $scope.newPassword,
          verifyPassword: $scope.verifyPassword
        })
        .$promise.then(function() { // success cbk
          $scope.showSuccessMsg = true;
          $scope.success = true;
        },
        function() { // error cbk
          $scope.showErrorMsg = true;
        });
    };
  }
]);
