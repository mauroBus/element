
angular.module('elementBoxApp.register.controller', [])

.controller('RegisterCtrl', [
          '$scope', '$rootScope', '$state', 'AUTH_EVENTS', 'AuthService',
  function($scope,   $rootScope,   $state,   AUTH_EVENTS,   AuthService) {
    $scope.credentials = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',      
      displayName: '',
      username: ''
    };

    $scope.register = function (credentials) {
      AuthService.signup($scope.credentials)
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
