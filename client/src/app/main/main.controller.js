angular.module('elementBoxApp.main')

.controller('MainCtrl', ['$state', '$scope', '$rootScope', function($state, $scope, $rootScope) {
    if ($state.current.name === 'main') {
      $state.go('main.home');
    }

    $scope.appTitle = '';
    $scope.defaultTitle = 'Element SandBox';

    $scope.menuOpened = false;

    $scope.toggleMenu = function() {
      $scope.menuOpened = !$scope.menuOpened;
    };

    $rootScope.$on('title', function(event, title) {
      $scope.appTitle = title;
    });

  }
]);
