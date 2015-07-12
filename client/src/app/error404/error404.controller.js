
angular.module('elementBoxApp.error404')

.controller('Error404Ctrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.greetings = 'Good Bye!';

    $rootScope.$emit('title', $scope.defaultTitle);
  }
]);
