
angular.module('elementBoxApp.signup')

.controller('SignupCtrl', [
          '$scope', '$rootScope', '$state', 'AUTH_EVENTS', 'AuthService',
  function($scope,   $rootScope,   $state,   AUTH_EVENTS,   AuthService) {

    if (AuthService.isAuthenticated()) {
      $state.go('main.home');
      return;
    }

    $rootScope.$emit('title', 'TITLE_SIGN_UP');

    $scope.displayError = false;
    $scope.inProgress = false;
    $scope.errors = {};

    $scope.credentials = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      // displayName: '',
      username: ''
    };

    $scope.signup = function (valid) {
      if (!valid) {
        $scope.displayError = true;
        return;
      }

      $scope.displayError = false;
      $scope.inProgress = true;
      $scope.errors = {};

      AuthService.signup($scope.credentials)
        .then(function(res) { // success cbk.
          $rootScope.$broadcast(AUTH_EVENTS.singinSuccess, {user: res.data.user, navigate: true});
          $scope.inProgress = false;
        }, function(res) { // error cbk.
          // $rootScope.$broadcast(AUTH_EVENTS.singinFailed);
          angular.extend($scope.errors, res.data.errors || {});
          $scope.displayError = true;
          $scope.inProgress = false;
        });
    };
  }
]);
