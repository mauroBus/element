
angular.module('elementBoxApp.common')

.directive('productItem', function() {
  return {
    restrict: 'E',
    templateUrl: 'directives/productitem/productitem.html',
    transclude: true,
    scope: {
      product: '=',
      remove: '@',
      edit: '@',
      info: '@',
      fetchMethod: '&',
      removeMethod: '&'
    },
    controller: ['$scope', 'ModalAlert', function($scope, ModalAlert) {

      $scope.getProdThumbnail = function(product) {
        var url = product.images.length ? product.images[0].url : 'imgs/no-picture-medium.png';
        return url.replace('image/upload', 'image/upload/c_fill,h_140,w_210');
      };

      $scope.removeProduct = function(product) {
        if ($scope.removeMethod) {
          $scope.removeMethod();
        } else {
          ModalAlert.alert({
            title: 'Delete!',
            msg: 'Sure to delete this product?',
            hasCancel: true
          }).then(function() {
            product.$remove().then(function() {
              $scope.fetchMethod();
            });
          });
        }
      };
    }]

  };
});