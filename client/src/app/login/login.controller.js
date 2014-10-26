
angular.module('elementBoxApp.login.controller', [])

.controller('LoginCtrl', [
          '$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService',
  function($scope,   $rootScope,   AUTH_EVENTS,   AuthService) {
    $scope.credentials = {
      email: '',
      password: ''
    };

    $scope.login = function (credentials) {
      AuthService.login($scope.credentials)
        .then(function(user) {
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
          $scope.setCurrentUser(user);
        }, function () {
          $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        });
    };

  }
]);
