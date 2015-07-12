
angular.module('elementBoxApp.products.productNew')

.controller('ProductNewCtrl', [
          '$scope', '$rootScope', '$stateParams', 'ProductsService', 'Categories',
  function($scope,   $rootScope,   $stateParams,   ProductsService,   Categories) {
    $scope.productCreated = false;
    $scope.areImgsCollapsed = false;
    $scope.isCategSelected = false;
    $scope.selectedCateg = null;

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

    var checkError = function(prod) {
      var errors = {};
      errors.category = !$scope.selectedCateg;
      errors.title = !prod.title || !(prod.title.length >= 10 && prod.title.length <= 55);
      errors.price = prod.price === '' || prod.price < 0;
      errors.description = !prod.description;
      errors.images = !prod.images;

      return errors;
    };

    $scope.save = function() {
      $scope.error = checkError($scope.product);

      if ($scope.error.category || $scope.error.title || $scope.error.price || $scope.error.description || $scope.error.images) {
        return;
      }

      // $scope.product.categories.forEach(function(p, i) {
        // if (p) { categs.push($scope.categories[i]._id); }
      // });

      // $scope.product.catalogs.forEach(function(p, i) {
      //   if (p) { catags.push({ name: $scope.catalogs[i].filter }); }
      // });

      var data = angular.extend({}, $scope.product, { categories: [ $scope.selectedCateg._id ] });

      ProductsService
        .save(data, function(newProduct, headers) {
          $scope.productCreated = newProduct;
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
