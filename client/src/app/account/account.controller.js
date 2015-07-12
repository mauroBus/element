
angular.module('elementBoxApp.account')

.controller('AccountCtrl', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {
    $scope.activeState = $state.current.name;

    $rootScope.$emit('title', 'My Account');

    if ($state.current.name === 'main.account') {
      $state.go('main.account.myitems');
    }

    $scope.setState = function(stateName) {
      $scope.activeState = stateName;
    };

  }
]);
