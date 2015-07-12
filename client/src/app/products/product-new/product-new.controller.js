
angular.module('elementBoxApp.products.productNew')

.controller('ProductNewCtrl', [
          '$scope', '$rootScope', '$stateParams', 'ProductsService', 'Categories',
  function($scope,   $rootScope,   $stateParams,   ProductsService,   Categories) {
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

    var checkError = function(prod) {
      $scope.error.category = !$scope.selectedCateg;
      $scope.error.title = !prod.title || !(prod.title.length >= 10 && prod.title.length <= 55);
      $scope.error.price = prod.price === '' || prod.price < 0;
      $scope.error.description = !prod.description;
      $scope.error.images = !prod.images;
    };

    $scope.save = function() {
      checkError($scope.product);

      if ($scope.error.category || $scope.error.title || $scope.error.price || $scope.error.description || $scope.error.images) {
        // $('.field-set__item--category').scrollIntoView();
        window.scrollTo(0, 150);
        return;
      }

      // $scope.product.categories.forEach(function(p, i) {
        // if (p) { categs.push($scope.categories[i]._id); }
      // });

      // $scope.product.catalogs.forEach(function(p, i) {
      //   if (p) { catags.push({ name: $scope.catalogs[i].filter }); }
      // });

      var data = angular.extend({}, $scope.product, { categories: [ $scope.selectedCateg._id ] });

      ProductsService.save(data, function(newProduct, headers) {
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
