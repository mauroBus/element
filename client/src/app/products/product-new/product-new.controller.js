
angular.module('elementBoxApp.products.productNew')

.controller('ProductNewCtrl', [
          '$scope', '$rootScope', '$stateParams', 'ngProgressService', 'ProductsService', 'Categories', 'ProdErrorsService',
  function($scope,   $rootScope,   $stateParams,   ngProgressService,   ProductsService,   Categories,   ProdErrorsService) {
    $scope.productCreated = false;
    $scope.areImgsCollapsed = false;
    $scope.isCategSelected = false;
    $scope.selectedCateg = null;
    $scope.error = {};

    $rootScope.$emit('title', 'Create a Product');

    $scope.product = {
      title: '',
      description: '',
      images: [],
      categories: [],
      price: 0,
    };

    var CategoryRsr = Categories.getCategoriesTree();
    CategoryRsr
      // .query({flat: true})
      .query({ flat: false })
      .$promise.then(function(res) {
        $scope.categories = res;
      });

    $scope.save = function() {
      ProdErrorsService.checkProdErrors($scope.error, $scope.product, $scope.selectedCateg);

      if ($scope.error.category || $scope.error.title || $scope.error.price || $scope.error.description || $scope.error.images) {
        // $('.field-set__item--category').scrollIntoView();
        angular.element('body').animate({ scrollTop: 150 }, 400);
        return;
      }

      // $scope.product.categories.forEach(function(p, i) {
        // if (p) { categs.push($scope.categories[i]._id); }
      // });

      // $scope.product.catalogs.forEach(function(p, i) {
      //   if (p) { catags.push({ name: $scope.catalogs[i].filter }); }
      // });

      ngProgressService.start();

      var data = angular.extend({}, $scope.product, { categories: [ $scope.selectedCateg._id ] });

      ProductsService.save(data, function(newProduct, headers) {
        $scope.productCreated = newProduct;
        ngProgressService.complete();
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
