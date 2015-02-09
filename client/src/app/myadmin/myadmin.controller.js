
angular.module('elementBoxApp.myadmin')

.controller('MyAdminCtrl', ['$scope', '$state', function($scope, $state) {
  $scope.activeState = 'categorymanag';
  $state.go('main.myadmin.categorymanag');
}]);
