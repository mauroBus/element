
angular.module('elementBoxApp.main')
.controller('MenuCtrl', ['$scope', '$state', 'USER_ROLES', function($scope, $state, Roles) {

    $scope.Roles = Roles;

    $scope.menuItems = [
      {
        text: 'Home',
        goTo: 'main.home',
        icon: 'glyphicon-home',
        class: 'menu-home',
        displayIf: function() { return $scope.showLink('main.home'); },
      },
      {
        text: 'Products',
        goTo: 'main.products',
        icon: 'glyphicon-th-list',
        class: 'menu-products',
        displayIf: function() { return $scope.showLink('main.products'); },
      },
      {
        text: 'Publish',
        goTo: 'main.products.new',
        icon: 'glyphicon-plus',
        class: 'menu-new',
        displayIf: function() { return $scope.showLink('main.newelement'); },
      },
      {
        text: 'My Admin',
        goTo: 'main.myadmin',
        icon: 'glyphicon-cog',
        class: 'menu-myadmin',
        displayIf: function() { return $scope.showLink('main.myadmin', Roles.admin); },
      },
      {
        text: 'Account',
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
    };

    $scope.goto = function(state) {
      if ($state.current.name !== state) {
        $state.go(state);
      }
      $scope.toggleMenu();
    };

  }
]);




