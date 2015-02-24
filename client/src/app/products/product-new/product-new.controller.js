
angular.module('elementBoxApp.products.productNew')

.controller('ProductNewCtrl', [
          '$scope', '$stateParams', 'ProductsService', 'Categories',
  function($scope,   $stateParams,   ProductsService,   Categories) {
    $scope.productCreated = false;
    $scope.areImgsCollapsed = true;
    $scope.product = {
      title: '',
      description: '',
      images: [],
      categories: [],
      price: 0,
    };

    var CategoryRsr = Categories.getCategoriesTree();
    CategoryRsr
      .query({flat: true})
      .$promise.then(function(res) {
        $scope.categories = res;
      });

    $scope.save = function() {
      var categs = [];
      $scope.product.categories.forEach(function(p, i) {
        if (p) { categs.push($scope.categories[i]._id); }
      });
      // $scope.product.catalogs.forEach(function(p, i) {
      //   if (p) { catags.push({ name: $scope.catalogs[i].filter }); }
      // });

      ProductsService
        .save(angular.extend({}, $scope.product, {categories: categs}), function(newProduct, headers) {
          $scope.productCreated = newProduct;
        });
    };
  }
]);
