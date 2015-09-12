
angular.module('elementBoxApp.products.productNew')

.controller('ProductNewCtrl', [
          '$scope', '$rootScope', '$stateParams', 'ngProgressService', 'ProductsService', 'Categories', 'ProdErrorsService',
  function($scope,   $rootScope,   $stateParams,   ngProgressService,   ProductsService,   Categories,   ProdErrorsService) {
    $scope.productCreated = false;
    $scope.areImgsCollapsed = false;
    $scope.isCategSelected = false;
    $scope.selectedCateg = null;
    $scope.inProgress = false;
    $scope.error = {};
    $scope.uploader = {
      api: {},
      listeners: {
        onCompleteAll: function(arg) {
          console.log('onCompleteAll');
        }
      }
    };

    $rootScope.$emit('title', 'TITLE_CREATE_PRODUCT');

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


    var saveProduct = function() {
      // $scope.product.categories.forEach(function(p, i) {
        // if (p) { categs.push($scope.categories[i]._id); }
      // });

      // $scope.product.catalogs.forEach(function(p, i) {
      //   if (p) { catags.push({ name: $scope.catalogs[i].filter }); }
      // });

      ngProgressService.start();
      $scope.inProgress = true;

      var data = angular.extend({}, $scope.product, { categories: [ $scope.selectedCateg._id ] });

      ProductsService.save(data, function(newProduct, headers) {
        $scope.productCreated = newProduct;
        ngProgressService.complete();
        $scope.inProgress = false;
      });
    };

    $scope.save = function() {
      ProdErrorsService.checkProdErrors($scope.error, $scope.product, $scope.selectedCateg);

      // Checking errors:
      if ($scope.error.category || $scope.error.title || $scope.error.price || $scope.error.description || $scope.error.images) {
        // $('.field-set__item--category').scrollIntoView();
        angular.element('body').animate({ scrollTop: 150 }, 400);
        return;
      }

      if ($scope.uploader.api.getNotUploadedItems().length > 0) {
        $scope.uploader.listeners.onCompleteAll = saveProduct.bind(this);
        $scope.uploader.api.uploadAll();
      } else {
        saveProduct();
      }

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
