
angular.module('elementBoxApp.signup.controller', [])

.controller('SignupCtrl', [
          '$scope', '$rootScope', '$state', 'AUTH_EVENTS', 'AuthService',
  function($scope,   $rootScope,   $state,   AUTH_EVENTS,   AuthService) {

    if (AuthService.isAuthenticated()) {
      $state.go('home');
    }

    $scope.credentials = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      displayName: '',
      username: ''
    };

    $scope.signup = function () {
      AuthService.signup($scope.credentials)
        .then(function(res) {
          $rootScope.$broadcast(AUTH_EVENTS.singinSuccess, {user: res.data.user, navigate: true});
        }, function () {
          $rootScope.$broadcast(AUTH_EVENTS.singinFailed);
        });
    };
  }
]);
