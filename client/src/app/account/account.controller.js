
angular.module('elementBoxApp.account')

.controller('AccountCtrl', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {
    $scope.activeState = $state.current.name;

    if ($scope.currentUser && $scope.currentUser.roles && $scope.currentUser.roles.indexOf($scope.userRoles.admin) >= 0) {
      $state.go('main.myadmin.mywishlist');
      return;
    }

    $rootScope.$emit('title', 'TITLE_MY_ACCOUNT');

    if ($state.current.name === 'main.account') {
      $state.go('main.account.myitems');
    }

    $scope.setState = function(stateName) {
      $scope.activeState = stateName;
    };

  }
]);
