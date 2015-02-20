
angular.module('elementBoxApp.products.productEdit', [])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('main.products.edit', {
      url: '/edit/{productId}',
      templateUrl: 'products/product-edit/product-edit.html',
      controller: 'ProductEditCtrl'
    });
  }
]);
