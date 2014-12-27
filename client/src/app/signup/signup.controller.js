
angular.module('elementBoxApp.signup.controller', [])

.controller('SignupCtrl', [
          '$scope', '$rootScope', '$state', 'AUTH_EVENTS', 'AuthService',
  function($scope,   $rootScope,   $state,   AUTH_EVENTS,   AuthService) {

    if (AuthService.isAuthenticated()) {
      $state.go('home');
    }

    $scope.displayError = false;
    $scope.errors = {};

    $scope.credentials = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      displayName: '',
      username: ''
    };

    $scope.signup = function (valid) {
      if (!valid) {
        $scope.displayError = true;
        return;
      }
      AuthService.signup($scope.credentials)
        .then(function(res) { // success cbk.
          $rootScope.$broadcast(AUTH_EVENTS.singinSuccess, {user: res.data.user, navigate: true});
          $scope.displayError = false;
        }, function(res) { // error cbk.
          // $rootScope.$broadcast(AUTH_EVENTS.singinFailed);
          console.log(res.data.errors);
          angular.extend($scope.errors, res.data.errors || {});
        });
    };
  }
]);
