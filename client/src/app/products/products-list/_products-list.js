
angular.module('elementBoxApp.products.productList', ['ui.tree'])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider
      .state('main.products.list', {
        url: '/list/{categ}/page-{page}',
        templateUrl: 'products/products-list/products-list.html',
        // views: {
        //   categs: 
        // }
        controller: 'ProductsListCtrl'
      });

  }
]);
