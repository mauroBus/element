
angular.module('elementBoxApp.products.productEdit')

.controller('ProductEditCtrl', [
          '$scope', '$rootScope', '$stateParams', 'ProductsService', 'Categories', 'ProdErrorsService',
  function($scope,   $rootScope,   $stateParams,   ProductsService,   Categories,   ProdErrorsService) {
    $scope.slides = [];
    $scope.slidesIndex = 0;
    $scope.categories = [];
    $scope.productSaved = false;
    $scope.isCategSelected = false;
    $scope.selectedCateg = null;
    $scope.error = {};
    // $scope.areImgsCollapsed = false;

    $rootScope.$emit('title', 'Edit Product');

    // Fetching product:
    $scope.product = ProductsService.get({ id: $stateParams.productId }, function(p) {
      p.images.forEach(function(image, index) {
        $scope.slides.push({ url: image.url, index: index+1 });
      });
    });

    var CategoryRsr = Categories.getCategoriesTree();
    CategoryRsr
      .query({ flat: false })
      .$promise.then(function(res) {
        $scope.categories = res;
      });

    $scope.hasCateg = function(categ) {
      for (var i in $scope.product.categories) {
        if ($scope.product.categories[i] === categ._id) {
          return true;
        }
      }
      return false;
    };

    $scope.save = function() {
      var categs = [], catags = [];

      ProdErrorsService.checkProdErrors($scope.error, $scope.product, $scope.selectedCateg);

      if ($scope.error.category || $scope.error.title || $scope.error.price || $scope.error.description || $scope.error.images) {
        // $('.field-set__item--category').scrollIntoView();
        window.scrollTo(0, 150);
        return;
      }

      var data = angular.extend({}, $scope.product, {
        categories: [ $scope.selectedCateg._id ]
      });

      $scope.product.$update(function() {
        $scope.productSaved = true;
      });
    };

    $scope.onCategSelected = function(path, categName) {
      $scope.isCategSelected = true;
      $scope.selectedCateg = path[path.length-1];
      $scope.error.category = false;
    };

    $scope.onCategUnselected = function(path, categName) {
      $scope.isCategSelected = false;
      $scope.selectedCateg = null;
    };

  }
]);
