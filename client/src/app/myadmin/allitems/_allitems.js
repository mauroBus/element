
angular.module('elementBoxApp.myadmin.allitems', ['elementBoxApp.products'])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('main.myadmin.allitems', {
      url: '/allitems',
      templateUrl: 'myadmin/allitems/allitems.html',
      controller: 'AllItemsCtrl'
    });
  }
]);
