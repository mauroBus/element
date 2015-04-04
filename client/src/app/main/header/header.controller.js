
angular.module('elementBoxApp.main')

.controller('HeaderCtrl', [
          '$scope', '$rootScope', '$state', '$stateParams', 'AuthService', 'AUTH_EVENTS', 'USER_ROLES',
  function($scope,  $rootScope,    $state,   $stateParams,   AuthService,   AUTH_EVENTS,   Roles) {
    $scope.title = 'Element SandBox';
    $scope.isMenuOpen = false;
    $scope.Roles = Roles;

    $scope.getSubStateName = function() {
      // main.home
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
    };

    $scope.showLink = function(state, role) {
      if (role && (!$scope.currentUser || angular.equals({}, $scope.currentUser))) {
        return false;
      }
      if (role && ($scope.currentUser.roles.indexOf(role) < 0)) {
        return false;
      }
      // $scope.subStateName = $scope.getSubStateName();
      return true;
    };

    $scope.isActive = function(state) {
      var regExp = new RegExp('^' + state);
      return regExp.test($state.current.name);
    };

    $scope.signout = function() {
      AuthService.signout($scope.credentials)
        .then(function(res) {
          $rootScope.$broadcast(AUTH_EVENTS.signoutSuccess, res.data.user);
        });
    };

    $scope.toggleMenu = function($event) {
      $scope.isMenuOpen = !$scope.isMenuOpen;
    };

    $scope.goto = function(state) {
      if ($state.current.name !== state) {
        $state.go(state);
      }
    };

  }
]);
