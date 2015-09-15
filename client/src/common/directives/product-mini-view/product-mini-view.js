
angular.module('elementBoxApp.common')

.directive('productMiniView', function() {
  return {
    restrict: 'E',
    templateUrl: 'directives/product-mini-view/product-mini-view.html',
    transclude: true,
    scope: {
      product: '='
    },
    // controller: ['$scope', function($scope) {
    //   $scope.slides = [];

    //   $scope.product.images.forEach(function(image, index) {
    //     $scope.slides.push({ url: image.url, index: index+1 });
    //   });

    // }]
  };
});
