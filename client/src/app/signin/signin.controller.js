
angular.module('elementBoxApp.signin')

.controller('SigninCtrl', [
          '$scope', '$rootScope', '$timeout', 'AUTH_EVENTS', 'AuthService', '$state',
  function($scope,   $rootScope,   $timeout,   AUTH_EVENTS,   AuthService,   $state) {

    if (AuthService.isAuthenticated()) {
      $state.go('main.home');
      return;
    }

    $rootScope.$emit('title', 'Sign In');

    $scope.displayError = false;
    $scope.invalidCredentials = false;
    $scope.showCredAlert = false;
    $scope.credentials = {
      email: '',
      password: ''
    };

    $scope.signin = function(valid) {
      if (!valid) {
        $scope.displayError = true;
        return;
      }

      AuthService.signin($scope.credentials)
        .then(function(res) { // success cbk.
          $rootScope.$broadcast(AUTH_EVENTS.singinSuccess, {user: res.data.user, navigate: true});
          $scope.displayError = false;
          $scope.invalidCredentials = false;
        }, function(res) { // error cbk.
          // $rootScope.$broadcast(AUTH_EVENTS.singinFailed);
          $scope.invalidCredentials = false;
          $scope.showCredAlert = false;
          $scope.displayError = true;

          $timeout(function() {
            $scope.invalidCredentials = true;
            $scope.showCredAlert = true;
          }, 1);
        });
    };
  }
]);
