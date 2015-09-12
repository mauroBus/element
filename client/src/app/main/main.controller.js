angular.module('elementBoxApp.main')

.controller('MainCtrl', ['$state', '$scope', '$rootScope', '$timeout', '$translate', function($state, $scope, $rootScope, $timeout, $translate) {
    if ($state.current.name === 'main') {
      $state.go('main.home');
    }

    $scope.appTitle = '';
    $scope.defaultTitle = 'TITLE_DEFAULT';
    $scope.defaultTitleTransl = '';

    $translate('TITLE_DEFAULT').then(function (title) {
      $scope.defaultTitleTransl = title;
    });

    $scope.menuOpened = false;
    var $title = window.$('head title');

    $scope.toggleMenu = function() {
      $scope.menuOpened = !$scope.menuOpened;
    };

    $rootScope.$on('title', function(event, title) {
      if (!title) { return; }
      $scope.appTitle = title;

      $timeout(function() { // waiting 500ms for updating the router url before the page title (browser nav issue).
        $translate(title).then(function (titleTr) {
          $title.text($scope.defaultTitleTransl + ' - ' + titleTr);
        });
      }, 500);
    });

    $rootScope.$on('title', function(event, title) {
    });

  }
]);
