
angular.module('elementBoxApp.account.myitems', ['elementBoxApp.products'])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('main.account.myitems', {
      url: '/myitems',
      templateUrl: 'account/myitems/myitems.html',
      controller: 'MyAccountItemsCtrl'
      // reloadOnSearch: false
    });
  }
]);
