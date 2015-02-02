
angular.module('elementBoxApp.products.productInfo')

.controller('ProductInfoCtrl', [
          '$scope', '$stateParams', 'ProductsService',
  function($scope,   $stateParams,   ProductsService) {
    $scope.slides = [];
    $scope.slidesIndex = 0;

    $scope.product = ProductsService.get({id: $stateParams.productId}, function(p) {
      p.images.forEach(function(image, index) {
        $scope.slides.push({ url: image.url, index: index+1 });
      });
    });

    // angular.select('.product-info .image-slider img').;
    // element.onmousedown = function(event) {
    //   event.preventDefault();
    //   return false;
    // };

    // document.getElementsByClassName('img-no-drag').ondragstart = function() { return false; };

    // $scope.myInterval = 5000;
    // $scope.slides2 = [];

  }
]);
