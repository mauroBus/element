angular.module('elementBoxApp.controller', [])

.controller('AppController', [
          '$scope', 'USER_ROLES', 'AuthService', '$rootScope', '$state', 'AUTH_EVENTS', 'EVENT_NAMES', 'ModalAlert', 'ErrorHandler',
  function($scope,   USER_ROLES,   AuthService,   $rootScope,   $state,   AUTH_EVENTS,   EVENT_NAMES,   ModalAlert,   ErrorHandler) {
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

    $rootScope.$on(AUTH_EVENTS.singinSuccess, function(event, options) {
      $scope.setCurrentUser(options.user);
      if (options.navigate) { $state.go('home'); }
    });

    $rootScope.$on(AUTH_EVENTS.singinFailed, function() {
      console.log('Login failed');
    });

    $rootScope.$on(AUTH_EVENTS.signoutSuccess, function(event) {
      $scope.currentUser = {};
    });

    // When app starts checking if user is signed in (cookies).
    AuthService.me();

    ModalAlert.alertOn({
      eventName: EVENT_NAMES.errorResponse,
      parseMsgCbk: ErrorHandler.translate
    });

  }
]);
