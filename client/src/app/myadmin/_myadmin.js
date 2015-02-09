
angular.module('elementBoxApp.myadmin', [
  'elementBoxApp.myadmin.categorymanag',
  'elementBoxApp.myadmin.userlist',
  'elementBoxApp.myadmin.myitems',
  'ui.tree'
])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('main.myadmin', {
      url: '/myadmin',
      templateUrl: 'myadmin/myadmin.html',
      controller: 'MyAdminCtrl'
    });
  }
]);
