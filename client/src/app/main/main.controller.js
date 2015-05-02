angular.module('elementBoxApp.main')

.controller('MainCtrl', ['$state', '$scope', function($state, $scope) {
    if ($state.current.name === 'main') {
      $state.go('main.home');
    }

    $scope.appTitle = 'Element SandBox';

    $scope.menuOpened = false;

    $scope.toggleMenu = function() {
      $scope.menuOpened = !$scope.menuOpened;
    };

  }
]);
