
angular.module('elementBoxApp.account')

.controller('AccountCtrl', [
          '$scope', '$state',
  function($scope,   $state) {
    $scope.activeState = $state.current.name;

    if ($state.current.name === 'main.account') {
      $state.go('main.account.myitems');
    }

    $scope.setState = function(stateName) {
      $scope.activeState = stateName;
    };

  }
]);
