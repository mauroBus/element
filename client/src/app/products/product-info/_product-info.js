
angular.module('elementBoxApp.products.productInfo', ['slick'])

.config([ '$stateProvider',
  function($stateProvider) {

    $stateProvider.state('main.products.info', {
      url: '/info/{productId}',
      templateUrl: 'products/product-info/product-info.html',
      controller: 'ProductInfoCtrl'
    });

    $stateProvider.state('main.products.info-404', {
      url: '/info-404',
      templateUrl: 'products/product-info/product-info-404.html',
      controller: ['$rootScope', function($rootScope) {
        $rootScope.$emit('title', 'TITLE_MY_PRODUCT_INFO');
      }]
    });

  }
]);
