
angular.module('elementBoxApp.register.controller', [])

.controller('RegisterCtrl', [
          '$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService',
  function($scope,   $rootScope,   AUTH_EVENTS,   AuthService) {
    $scope.credentials = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };

    $scope.register = function (credentials) {
      AuthService.register($scope.credentials)
        .then(function(user) {
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
          $scope.setCurrentUser(user);
        }, function () {
          $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        });
    };
  }
]);
