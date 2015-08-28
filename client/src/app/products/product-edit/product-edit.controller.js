
angular.module('elementBoxApp.products.productEdit')

.controller('ProductEditCtrl', [
          '$scope', '$rootScope', '$stateParams', '$q', '$timeout', 'ngProgressService', 'ProductsService', 'Categories', 'ProdErrorsService',
  function($scope,   $rootScope,   $stateParams,   $q,   $timeout,   ngProgressService,   ProductsService,   Categories,   ProdErrorsService) {
    $scope.slides = [];
    $scope.slidesIndex = 0;
    $scope.categories = [];
    $scope.productSaved = false;
    $scope.isCategSelected = false;
    $scope.selectedCateg = null;
    $scope.error = {};
    $scope.categApi = {};

    // $scope.areImgsCollapsed = false;

    var prodDfd = $q.defer(),
      categDfd = $q.defer();

    $rootScope.$emit('title', 'Edit Product');

    // Fetching product:
    $scope.product = ProductsService.get({ id: $stateParams.productId }, function(p) {
      p.images = p.images ? p.images : [];
      p.images.forEach(function(image, index) {
        $scope.slides.push({ url: image.url, index: index+1 });
      });

      prodDfd.resolve();
    });

    var CategoryRsr = Categories.getCategoriesTree();
    CategoryRsr
      .query({ flat: false })
      .$promise.then(function(res) {
        $scope.categories = res;
        $timeout(function() {
          categDfd.resolve();
        }, 500);
      });

    $q.all([prodDfd.promise, categDfd.promise])
      .then(function() {
        // $scope.selectedCateg = ;
        $scope.categApi.setCategory($scope.product.categories[0]);
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
        angular.element('body').animate({ scrollTop: 150 }, 400);
        return;
      }

      ngProgressService.start();

      $scope.product.categories[0] = $scope.selectedCateg._id;
      // var data = angular.extend({}, $scope.product, {
      //   categories: [ $scope.selectedCateg._id ]
      // });

      $scope.product.$update(function() {
        $scope.productSaved = $scope.product;
        ngProgressService.complete();
        angular.element('body').animate({ scrollTop: 0 }, 400);
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

    $scope.getProdThumbnail = function(product) {
      var url = product.images.length ? product.images[0].url : 'imgs/no-picture-medium.png';
      return url.replace('image/upload', 'image/upload/c_fill,h_140,w_210');
    };

  }
]);
