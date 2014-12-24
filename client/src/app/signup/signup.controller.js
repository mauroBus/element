
angular.module('elementBoxApp.signup.controller', [])

.controller('SignupCtrl', [
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

    $scope.signup = function (credentials) {
      AuthService.signup($scope.credentials)
        .then(function(user) {
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, user);
        }, function () {
          $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        });
    };
  }
]);
