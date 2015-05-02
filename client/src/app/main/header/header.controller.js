
angular.module('elementBoxApp.main')

.controller('HeaderCtrl', [
          '$scope', '$rootScope', '$state', '$stateParams', 'AuthService', 'AUTH_EVENTS',
  function($scope,  $rootScope,    $state,   $stateParams,   AuthService,   AUTH_EVENTS) {
    // $scope.isMenuOpen = false;

    // $scope.getSubStateName = function() {
    //   // main.home
    //   // main.newelement
    //   // main.about
    //   // main.myadmin
    //   // main.products
    //   if ($state.path() === '/home') {
    //     return 'Home Page';
    //   }
    //   if ($state.path() === '/newelement') {
    //     return 'New Element Page';
    //   }
    //   if ($state.path() === '/about') {
    //     return 'About Page';
    //   }
    //   if ($stateParams.dni) {
    //     return 'Element dni:' + $stateParams.dni + ' Info';
    //   }
    // };

    $scope.signout = function() {
      AuthService.signout($scope.credentials)
        .then(function(res) {
          $rootScope.$broadcast(AUTH_EVENTS.signoutSuccess, res.data.user);
        });
    };

    // $scope.toggleMenu = function($event) {
    //   $scope.isMenuOpen = !$scope.isMenuOpen;
    // };

  }
]);
