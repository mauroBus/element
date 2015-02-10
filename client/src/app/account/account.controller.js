
angular.module('elementBoxApp.account')

.controller('AccountCtrl', [
          '$scope', '$state',
  function($scope,   $state) {
    $scope.activeState = 'myitems';
    $state.go('main.account.myitems');
  }
]);
