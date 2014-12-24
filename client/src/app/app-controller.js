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
        roles: user.roles
      };
    };

    $rootScope.$on(AUTH_EVENTS.singinSuccess, function(event, user) {
      $scope.setCurrentUser(user);
      $state.go('home');
    });

    $rootScope.$on(AUTH_EVENTS.singinFailed, function(event) {
      console.log('Login failed');
    });

    var checkUserSigned = function() {
      AuthService.me().then(function(res) { // success cbk
        $scope.setCurrentUser(res.data);
      });
    };

    checkUserSigned();
  }
]);
