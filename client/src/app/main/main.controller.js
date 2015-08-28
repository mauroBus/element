angular.module('elementBoxApp.main')

.controller('MainCtrl', ['$state', '$scope', '$rootScope', '$timeout', function($state, $scope, $rootScope, $timeout) {
    if ($state.current.name === 'main') {
      $state.go('main.home');
    }

    $scope.appTitle = '';
    $scope.defaultTitle = 'SandBox App';

    $scope.menuOpened = false;
    var $title = window.$('head title');

    $scope.toggleMenu = function() {
      $scope.menuOpened = !$scope.menuOpened;
    };

    $rootScope.$on('title', function(event, title) {
      if (!title) { return; }
      $scope.appTitle = title;

      $timeout(function() { // waiting 500ms for updating the router url before the page title (browser nav issue).
        $title.text($scope.defaultTitle + ' - ' + title);
      }, 500);
    });

    $rootScope.$on('title', function(event, title) {
    });

  }
]);
