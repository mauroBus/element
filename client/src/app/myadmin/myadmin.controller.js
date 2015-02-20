
angular.module('elementBoxApp.myadmin')

.controller('MyAdminCtrl', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
  $scope.activeState = $state.current.name;

  if ($state.current.name === 'main.myadmin') {
    $state.go('main.myadmin.categorymanag');
  }

  $scope.setState = function(stateName) {
    $scope.activeState = stateName;
  };

}]);
