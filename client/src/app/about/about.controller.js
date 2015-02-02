
angular.module('elementBoxApp.about')

.controller('AboutCtrl', ['$scope', function($scope) {
    $scope.concepts = [];

    $scope.authors = {
      backend: 'me',
      frontend: 'me',
      testing: 'nobady'
    };
  }
]);
