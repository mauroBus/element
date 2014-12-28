
angular.module('elementBoxApp.products.productInfo.controller', [])

.controller('ProductInfoCtrl', [
          '$scope', '$stateParams', 'ProductsService',
  function($scope,   $stateParams,   ProductsService) {
    $scope.slides = [];

    $scope.product = ProductsService.get({id: $stateParams.productId}, function(p) {
      $scope.slides = p.images;
      $scope.slides[0].active = true;
    });

    $scope.next = function() {
      console.log(arguments);
    };

    $scope.prev = function() {
      console.log(arguments);
    };

  }
]);
