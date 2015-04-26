angular.module('elementBoxApp.main')

.controller('MainCtrl', ['$state', '$scope', function($state, $scope) {
    if ($state.current.name === 'main') {
      $state.go('main.home');
    }

    $scope.menuOpened = false;

    $scope.toggleMenu = function() {
      $scope.menuOpened = !$scope.menuOpened;
    };

  }
]);
