
angular.module('elementBoxApp.myadmin.categorymanag', [])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('main.myadmin.categorymanag', {
      url: '/categorymanag',
      templateUrl: 'myadmin/categorymanag/categorymanag.html',
      controller: 'CategoryManagCtrl'
      // reloadOnSearch: false
    });
  }
]);
