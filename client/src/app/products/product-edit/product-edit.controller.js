
angular.module('elementBoxApp.products.productEdit')

.controller('ProductEditCtrl', [
          '$scope', '$stateParams', 'ProductsService', 'Categories',
  function($scope,   $stateParams,   ProductsService,   Categories) {
    $scope.slides = [];
    $scope.slidesIndex = 0;
    $scope.categories = [];
    $scope.productSaved = false;

    // Fetching product:
    $scope.product = ProductsService.get({ id: $stateParams.productId }, function(p) {
      p.images.forEach(function(image, index) {
        $scope.slides.push({ url: image.url, index: index+1 });
      });
    });

    var CategoryRsr = Categories.getCategoriesTree();
    CategoryRsr
      .query({flat: true})
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
      $scope.product.categories.forEach(function(p, i) {
        if (p) { categs.push($scope.categories[i]._id); }
      });
      // $scope.product.catalogs.forEach(function(p, i) {
      //   if (p) { catags.push({ name: $scope.catalogs[i].filter }); }
      // });

      angular.extend($scope.product, { categories: categs, catalogs: catags });

      $scope.product.$update(function() {
        $scope.productSaved = true;
      });
    };

  }
]);
