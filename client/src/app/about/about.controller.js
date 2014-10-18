
angular.module('elementBoxApp')

.controller('AboutCtrl', ['$scope', function($scope) {
    $scope.concepts = [];

    $scope.authors = {
      backend: '',
      frontend: '',
      testing: ''
    };
  }
]);
