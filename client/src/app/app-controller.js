angular.module('elementBoxApp.controller', [])

.controller('AppController', [
          '$scope', 'USER_ROLES', 'AuthService', '$rootScope', '$state', 'AUTH_EVENTS',
  function($scope,   USER_ROLES,   AuthService, $rootScope, $state, AUTH_EVENTS) {
    $scope.currentUser = null;
    $scope.userRoles = USER_ROLES;
    $scope.isAuthorized = AuthService.isAuthorized;

    $scope.setCurrentUser = function (user) {
      $scope.currentUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        provider: user.provider,
        createdAt: user.createdAt,
        role: user.role
      };
    };

    $rootScope.$on(AUTH_EVENTS.loginSuccess, function(event, user) {
      $scope.setCurrentUser(user);
      $state.go('home');
    });

    $rootScope.$on(AUTH_EVENTS.loginFailed, function(event) {
      console.log('Login failed');
    });
  }
]);
