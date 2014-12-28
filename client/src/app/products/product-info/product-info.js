
angular.module('elementBoxApp.products.productInfo', [
  'elementBoxApp.products.productInfo.controller'
])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('productinfo', {
      url: '/products/:productId',
      templateUrl: 'products/product-info/product-info.html',
      controller: 'ProductInfoCtrl'
    });
  }
]);
