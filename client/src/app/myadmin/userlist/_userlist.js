
angular.module('elementBoxApp.myadmin.userlist', [])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('main.myadmin.userlist', {
      url: '/userlist',
      templateUrl: 'myadmin/userlist/userlist.html',
      controller: 'UserlistCtrl'
      // reloadOnSearch: false
    });
  }
]);
