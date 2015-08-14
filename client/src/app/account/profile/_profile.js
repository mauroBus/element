
angular.module('elementBoxApp.account.profile', ['elementBoxApp.products'])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('main.account.profile', {
      url: '/profile',
      templateUrl: 'account/profile/profile.html',
      controller: 'MyAccountProfileCtrl'
      // reloadOnSearch: false
    });
  }
]);
