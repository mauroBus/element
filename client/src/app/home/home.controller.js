
angular.module('elementBoxApp.home')

.controller('HomeCtrl', ['$scope', 'Categories', function($scope, Categories) {

    $scope.categs = [];

    var init = function() {
      var CategoryRsr = Categories.getCategoriesTree();

      CategoryRsr
        .query({ flat: true })
        .$promise.then(function(res) {
          $scope.categs = res;
        });
    };

    init();
  }
]);
