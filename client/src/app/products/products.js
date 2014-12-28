
angular.module('elementBoxApp.products', [
  'elementBoxApp.products.controller',
  'elementBoxApp.products.productInfo'
])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('products', {
      url: '/products',
      templateUrl: 'products/products.html',
      controller: 'ProductsCtrl'
    });

    // $stateProvider.state('products.fastInfo', {
    //   url: '/products/fastInfo',
    //   templateUrl: 'products/fast-info.html',
    //   controller: 'FastInfoCtrl'
    // });

  }
]);
