
angular.module('elementBoxApp.common')

.directive('productMiniView', function() {
  return {
    restrict: 'E',
    templateUrl: 'directives/product-mini-view/product-mini-view.html',
    transclude: true,
    scope: {
      product: '='
    },
    controller: ['$scope', 'UserService', function($scope, UserService) {

      if ($scope.product.owner._id) { return; }

      UserService.get({ id: $scope.product.owner })
        .$promise.then(function(data) {
          $scope.product.owner = data;
        });

      // $scope.slides = [];
      // $scope.product.images.forEach(function(image, index) {
      //   $scope.slides.push({ url: image.url, index: index+1 });
      // });
    }]
  };
});
