
angular.module('elementBoxApp.products.productNew')

.controller('ProductNewCtrl', [
          '$scope', '$rootScope', '$stateParams', 'ProductsService', 'Categories',
  function($scope,   $rootScope,   $stateParams,   ProductsService,   Categories) {
    $scope.productCreated = false;
    $scope.areImgsCollapsed = true;
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

    $scope.save = function() {
      var categs = [];
      // $scope.product.categories.forEach(function(p, i) {
        // if (p) { categs.push($scope.categories[i]._id); }
      // });

      // $scope.product.catalogs.forEach(function(p, i) {
      //   if (p) { catags.push({ name: $scope.catalogs[i].filter }); }
      // });

      ProductsService
        .save(angular.extend({}, $scope.product, {categories: categs}), function(newProduct, headers) {
          $scope.productCreated = newProduct;
        });
    };

    $scope.onCategSelected = function(path, categName) {
      $scope.isCategSelected = true;
      $scope.selectedCateg = path[path.length-1];
    };

    $scope.onCategUnselected = function(path, categName) {
      $scope.isCategSelected = false;
      $scope.selectedCateg = null;
    };

  }
]);
