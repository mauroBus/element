
angular.module('elementBoxApp.products.productNew', [])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('main.products.new', {
      url: '/new',
      templateUrl: 'products/product-new/product-new.html',
      controller: 'ProductNewCtrl'
    });
  }
]);
