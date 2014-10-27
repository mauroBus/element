
angular.module('elementBoxApp.login.controller', [])

.controller('LoginCtrl', [
          '$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService', '$state',
  function($scope,   $rootScope,   AUTH_EVENTS,   AuthService,   $state) {
    $scope.credentials = {
      email: '',
      password: ''
    };

    $scope.login = function (credentials) {
      AuthService.login($scope.credentials)
        .then(function(user) {
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
          $scope.setCurrentUser(user);
          $state.go('home');
        }, function () {
          $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        });
    };

  }
]);
