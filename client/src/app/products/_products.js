
angular.module('elementBoxApp.products', [
  'elementBoxApp.products.productInfo',
  'elementBoxApp.products.productNew',
  'elementBoxApp.products.productList',
  'elementBoxApp.products.productEdit'
])

.run(['$rootScope', '$state', function($rootScope, $state) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    if (toState.name === 'main.products') {
      event.preventDefault();
      $state.go('main.products.list', { categ: '', pageNbr: 0 });
    }
  });
}])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider
      .state('main.products', {
        url: '/products',
        // abstract: true,
        template: '<ui-view />'
      });

    // $stateProvider.state('products.fastInfo', {
    //   url: '/products/fastInfo',
    //   templateUrl: 'products/fast-info.html',
    //   controller: 'FastInfoCtrl'
    // });

  }
]);
