
angular.module('elementBoxApp.myadmin.myitems', ['elementBoxApp.products'])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('main.myadmin.myitems', {
      url: '/myitems',
      templateUrl: 'myadmin/myitems/myitems.html',
      controller: 'MyItemsCtrl'
      // reloadOnSearch: false
    });
  }
]);
