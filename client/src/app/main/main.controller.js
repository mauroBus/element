angular.module('elementBoxApp.main')

.controller('MainCtrl', [
          '$scope', 'USER_ROLES', 'AuthService', '$rootScope', '$state', 'AUTH_EVENTS', 'EVENT_NAMES', 'ModalAlert', 'ErrorHandler',
  function($scope,   USER_ROLES,   AuthService,   $rootScope,   $state,   AUTH_EVENTS,   EVENT_NAMES,   ModalAlert,   ErrorHandler) {
    $scope.currentUser = null;
    $scope.userRoles = USER_ROLES;
    $scope.isAuthorized = AuthService.isAuthorized;

    if ($state.current.name === 'main') {
      $state.go('main.home');
    }

    $scope.setCurrentUser = function (user) {
      $scope.currentUser = {
        id: user._id,
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
      if (options.navigate) { $state.go('main.home'); }
    });

    $rootScope.$on(AUTH_EVENTS.singinFailed, function() {
      console.log('Login failed');
    });

    $rootScope.$on(AUTH_EVENTS.signoutSuccess, function(event) {
      $scope.currentUser = {};
    });

    ModalAlert.alertOn({
      eventName: EVENT_NAMES.errorResponse,
      parseMsgCbk: ErrorHandler.translate
    });

    AuthService.me();

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if ( toState.name === 'main.myadmin' && (!$scope.currentUser || angular.equals({}, $scope.currentUser) || $scope.currentUser.roles.indexOf('ADMIN') < 0) ) {
        event.preventDefault();
        ModalAlert
          .alert({msg: 'You are not allowed to access to this page!'})
          .then(function() {
            // $state.go('main.home');
          });
      }
    });

  }
]);
