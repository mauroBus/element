
angular.module('elementBoxApp.products.productNew', [
  'elementBoxApp.products.productNew.controller'
])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('productnew', {
      url: '/productnew',
      templateUrl: 'products/product-new/product-new.html',
      controller: 'ProductNewCtrl'
    });
  }
]);
