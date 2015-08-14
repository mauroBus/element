
angular.module('elementBoxApp.account', [
  'elementBoxApp.account.myitems',
  'elementBoxApp.account.mywishlist',
  'elementBoxApp.account.profile'
])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('main.account', {
      url: '/account',
      templateUrl: 'account/account.html',
      controller: 'AccountCtrl'
    });
  }
]);
