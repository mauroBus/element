
angular.module('elementBoxApp.password.reset')

.controller('ResetPassCtrl', [
          '$scope', '$rootScope', '$stateParams', '$state', '$timeout', 'UserService', 'AUTH_EVENTS',
  function($scope,   $rootScope,   $stateParams,   $state,   $timeout,   UserService,   AUTH_EVENTS) {
    $rootScope.$emit('title', 'TITLE_RESET_PASS');

    if (!$stateParams.token) {
      $state.go('home');
    }

    $scope.newPassword = '';
    $scope.verifyPassword = '';

    $scope.errors = {};
    $scope.showSuccessMsg = false;
    $scope.showErrorMsg = false;
    $scope.showErrors = false;
    $scope.success = false;
    $scope.inProgress = false;
    $scope.askForReset = false;

    $scope.resetPass = function(formValid) {
      $scope.showErrors = false;
      $scope.showErrorMsg = false;
      $scope.newPassword.trim();
      $scope.verifyPassword.trim();

      if (!formValid || $scope.newPassword !== $scope.verifyPassword) {
        $timeout(function() { $scope.showErrorMsg = true; });
        return;
      }
      if ($scope.newPassword === '' || $scope.verifyPassword === '') { return; }

      $scope.showSuccessMsg = $scope.showErrorMsg = false;
      $scope.inProgress = true;

      UserService.resetPass({
          newPassword: $scope.newPassword,
          verifyPassword: $scope.verifyPassword,
          token: $stateParams.token
        })
        .$promise.then(function(user) { // success cbk
          $scope.showSuccessMsg = true;
          $scope.success = true;
          $scope.inProgress = false;
          // $timeout(function() {
            // $rootScope.$broadcast(AUTH_EVENTS.singinSuccess, { user: user, navigate: false });
          // });
        },
        function(err) { // error cbk
          if (err.status === 405) { // invalid or expired token:
            $scope.askForReset = true;
          }
          $scope.error = err.data ? err.data.message : 'PASSWORD.DEFAULT_ERROR';
          $scope.showErrors = true;
          $scope.showErrorMsg = true;
          $scope.inProgress = false;
        });
    };

  }
]);
