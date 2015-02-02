
angular.module('elementBoxApp.products.productInfo', ['angular-carousel'])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('main.products.info', {
      url: '/info/{productId}',
      templateUrl: 'products/product-info/product-info.html',
      controller: 'ProductInfoCtrl'
    });
  }
]);
