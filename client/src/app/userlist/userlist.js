
angular.module('elementBoxApp.userlist', [
  'elementBoxApp.userlist.controller'
])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('userlist', {
      url: '/userlist',
      templateUrl: 'userlist/userlist.html',
      controller: 'UserlistCtrl'
      // reloadOnSearch: false
    });
  }
]);
