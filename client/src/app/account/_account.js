
angular.module('elementBoxApp.account', [
  'elementBoxApp.account.myitems'
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
