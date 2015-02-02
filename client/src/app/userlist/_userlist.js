
angular.module('elementBoxApp.userlist', [])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('main.userlist', {
      url: '/userlist',
      templateUrl: 'userlist/userlist.html',
      controller: 'UserlistCtrl'
      // reloadOnSearch: false
    });
  }
]);
