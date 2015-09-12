
angular.module('elementBoxApp.myadmin')

.controller('MyAdminCtrl', ['$scope', '$rootScope', '$state', '$stateParams',
                    function($scope,   $rootScope,   $state,   $stateParams) {
  $scope.activeState = $state.current.name;

  $rootScope.$emit('title', 'TITLE_MY_ADMIN');

  if ($state.current.name === 'main.myadmin') {
    $state.go('main.myadmin.categorymanag');
  }

  $scope.setState = function(stateName) {
    $scope.activeState = stateName;
  };

}]);
