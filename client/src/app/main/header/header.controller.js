
angular.module('elementBoxApp.main')

.controller('HeaderCtrl', [
          '$scope', '$rootScope', '$state', '$stateParams', '$timeout', 'AuthService', 'AUTH_EVENTS', 'EVENT_NAMES',
  function($scope,  $rootScope,    $state,   $stateParams,   $timeout,   AuthService,   AUTH_EVENTS,   EVENT_NAMES) {
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

    $scope.currentState = $state.current.name;
    $scope.wishListItemAdded = false;
    $scope.wishListItemRemoved = false;

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        $scope.currentState = toState.name;
    });

    $scope.signout = function() {
      AuthService.signout($scope.credentials)
        .then(function(res) {
          $rootScope.$broadcast(AUTH_EVENTS.signoutSuccess, res.data.user);
          $state.go('main.signout');
        });
    };

    $rootScope.$on(EVENT_NAMES.addWishList, function() {
      $scope.wishListItemAdded = true;
        $timeout(function() {
          $scope.wishListItemAdded = false;
      }, 1500);
    });

    $rootScope.$on(EVENT_NAMES.removeWishList, function() {
      $scope.wishListItemRemoved = true;
        $timeout(function() {
          $scope.wishListItemRemoved = false;
      }, 1500);
    });

    // $scope.toggleMenu = function($event) {
    //   $scope.isMenuOpen = !$scope.isMenuOpen;
    // };

  }
]);
