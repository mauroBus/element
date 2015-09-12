
angular.module('elementBoxApp.main')
.controller('MenuCtrl', ['$scope', '$state', 'USER_ROLES', function($scope, $state, Roles) {

    $scope.Roles = Roles;

    $scope.menuItems = [
      {
        text: 'HOME',
        goTo: 'main.home',
        icon: 'glyphicon-home',
        class: 'menu-home',
        displayIf: function() { return $scope.showLink('main.home'); },
      },
      {
        text: 'PRODUCTS',
        goTo: 'main.products',
        icon: 'glyphicon-th-list',
        class: 'menu-products',
        displayIf: function() { return $scope.showLink('main.products'); },
      },
      {
        text: 'PUBLISH',
        goTo: 'main.products.new',
        icon: 'glyphicon-plus',
        class: 'menu-new',
        displayIf: function() { return $scope.showLink('main.newelement'); },
      },
      {
        text: 'MY_ADMIN',
        goTo: 'main.myadmin',
        icon: 'glyphicon-cog',
        class: 'menu-myadmin',
        displayIf: function() { return $scope.showLink('main.myadmin', Roles.admin); },
      },
      {
        text: 'ACCOUNT',
        goTo: 'main.account',
        icon: 'glyphicon-cog',
        class: 'menu-account',
        displayIf: function() { return $scope.showLink('main.account', Roles.user) && !$scope.showLink('main.account', Roles.admin); },
      },
    ];

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
      // return $state.current.name === state;
    };

    $scope.goto = function(item) {
      if ($state.current.name !== item.goTo) {
        $state.go(item.goTo);
      }
      $scope.toggleMenu();
    };

  }
]);
