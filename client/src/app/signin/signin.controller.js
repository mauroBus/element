
angular.module('elementBoxApp.signin.controller', [])

.controller('SigninCtrl', [
          '$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService', '$state',
  function($scope,   $rootScope,   AUTH_EVENTS,   AuthService,   $state) {

    if (AuthService.isAuthenticated()) {
      $state.go('home');
    }

    $scope.credentials = {
      email: '',
      password: ''
    };

    $scope.signin = function(credentials) {
      AuthService.signin($scope.credentials)
        .then(function(res) {
          $rootScope.$broadcast(AUTH_EVENTS.singinSuccess, {user: res.data.user, navigate: true});
        }, function(err) {
          $rootScope.$broadcast(AUTH_EVENTS.singinFailed);
        });
    };

  }
]);
