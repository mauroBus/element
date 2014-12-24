
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
        .then(function(res) {
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, res.data.user);
        }, function () {
          $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        });
    };

  }
]);
