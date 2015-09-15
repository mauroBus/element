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

    $rootScope.$on('title', function(event, title) {});

    $scope.showMiniView = false;
    $scope.miniViewProduct = {};
    $scope.animateInMiniProd = false;
    // $scope.animateOutMiniProd = false;

    $rootScope.$on('ev:prod-mini-view', function(ev, prod) {
      if ($scope.showMiniView) {
        $scope.hideMiniView();
      }
      // $timeout(function() {
      $scope.showMiniView = true;
      $scope.miniViewProduct = prod;
      $scope.animateInMiniProd = true;
      // });

      $timeout(function() {
        $scope.animateInMiniProd = false;
      }, 1000);
    });

    $scope.hideMiniView = function() {
      // $scope.animateOutMiniProd = true;
      $scope.showMiniView = false;
      $scope.miniViewProduct = {};
      $scope.animateInMiniProd = false;
      // $timeout(function() {
      // }, 1000);
    };

    $rootScope.$on('$stateChangeSuccess', function() {
      $scope.hideMiniView();
    });

  }
]);
