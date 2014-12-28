
angular.module('elementBoxApp.signin.controller', [])

.controller('SigninCtrl', [
          '$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService', '$state',
  function($scope,   $rootScope,   AUTH_EVENTS,   AuthService,   $state) {

    if (AuthService.isAuthenticated()) {
      $state.go('home');
    }

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
        }, function(res) { // error cbk.
          // $rootScope.$broadcast(AUTH_EVENTS.singinFailed);
          $scope.displayError = true;
          $scope.invalidCredentials = true;
          $scope.showCredAlert = true;
        });
    };
  }
]);
