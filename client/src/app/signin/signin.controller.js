
angular.module('elementBoxApp.signin.controller', [])

.controller('SigninCtrl', [
          '$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService', '$state',
  function($scope,   $rootScope,   AUTH_EVENTS,   AuthService,   $state) {
    $scope.credentials = {
      email: '',
      password: ''
    };

    $scope.signin = function (credentials) {
      AuthService.signin($scope.credentials)
        .then(function(res) {
          $rootScope.$broadcast(AUTH_EVENTS.singinSuccess, res.data.user);
        }, function () {
          $rootScope.$broadcast(AUTH_EVENTS.singinFailed);
        });
    };

  }
]);
