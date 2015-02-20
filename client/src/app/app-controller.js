
angular.module('elementBoxApp.controller', [])

.controller('AppController', [
          '$scope', 'USER_ROLES', 'AuthService', '$rootScope', '$state', 'AUTH_EVENTS', 'EVENT_NAMES', 'ModalAlert', 'ErrorHandler', 'UserService', 'Session',
  function($scope,   USER_ROLES,   AuthService,   $rootScope,   $state,   AUTH_EVENTS,   EVENT_NAMES,   ModalAlert,   ErrorHandler,   UserService,   Session) {
    $scope.currentUser = null;
    $scope.userRoles = USER_ROLES;
    $scope.isAuthorized = AuthService.isAuthorized;

    if ($state.current.name === 'main') {
      $state.go('main.home');
    }

    $rootScope.setCurrentUser = function (user) {
      $scope.currentUser = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        provider: user.provider,
        created: new Date(user.created),
        roles: user.roles,
        wishList: user.wishList,
        comments: user.comments,
      };
    };

    $rootScope.$on(AUTH_EVENTS.singinSuccess, function(event, options) {
      $rootScope.setCurrentUser(options.user);
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

    UserService
      .me({ SILENT_ON_ERROR: true })
      .$promise.then(function(myData) {
        if (!myData) { return; }
        Session.create(myData._id, myData);
        $rootScope.$broadcast(AUTH_EVENTS.singinSuccess, { user: myData, navigate: false });
      });

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

    $rootScope.$on(EVENT_NAMES.addWishList, function(product) {
      $scope.currentUser.wishList.push(product._id);
    });

    $rootScope.$on(EVENT_NAMES.addComment, function(comment) {
      $scope.currentUser.comments.push(comment);
    });

  }
]);
