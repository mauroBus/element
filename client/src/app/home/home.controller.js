
angular.module('elementBoxApp.home')

.controller('HomeCtrl', ['$scope', '$rootScope', 'Categories', function($scope, $rootScope, Categories) {

    $scope.categs = [];

    $rootScope.$emit('title', $scope.defaultTitle);

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
