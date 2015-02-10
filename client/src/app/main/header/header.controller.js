
angular.module('elementBoxApp.main')

.controller('HeaderCtrl', [
          '$scope', '$rootScope', '$state', '$stateParams', 'AuthService', 'AUTH_EVENTS', 'USER_ROLES',
  function($scope,  $rootScope,    $state,   $stateParams,   AuthService,   AUTH_EVENTS,   Roles) {
    var scope = {
      title: 'Element SandBox',

      getSubStateName: function() {
//         main.home
// main.newelement
// main.about
// main.myadmin
// main.products
        if ($state.path() === '/home') {
          return 'Home Page';
        }
        if ($state.path() === '/newelement') {
          return 'New Element Page';
        }
        if ($state.path() === '/about') {
          return 'About Page';
        }
        if ($stateParams.dni) {
          return 'Element dni:' + $stateParams.dni + ' Info';
        }
      },

      showLink: function(state, role) {
        var regExp = new RegExp('^' + state);
        if (role && (!$scope.currentUser || angular.equals({}, $scope.currentUser))) {
          return false;
        }
        if (role && ($scope.currentUser.roles.indexOf(role) < 0)) {
          return false;
        }
        // $scope.subStateName = $scope.getSubStateName();
        return !regExp.test($state.current.name);
      },

      signout: function() {
        AuthService.signout($scope.credentials)
          .then(function(res) {
            $rootScope.$broadcast(AUTH_EVENTS.signoutSuccess, res.data.user);
          });
      },

      Roles: Roles
    };

    angular.extend($scope, scope);
  }
]);
