
angular.module('elementBoxApp.account.mywishlist', ['elementBoxApp.products'])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('main.account.mywishlist', {
      url: '/mywishlist',
      templateUrl: 'account/mywishlist/mywishlist.html',
      controller: 'MyWishListCtrl'
    });
  }
]);
