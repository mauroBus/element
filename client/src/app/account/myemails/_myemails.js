
angular.module('elementBoxApp.account.myemails', ['elementBoxApp.products'])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('main.account.myemails', {
      url: '/myemails',
      templateUrl: 'account/myemails/myemails.html',
      controller: 'MyAccountEmailsCtrl'
      // reloadOnSearch: false
    });
  }
]);
