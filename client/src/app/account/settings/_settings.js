
angular.module('elementBoxApp.account.settings', ['elementBoxApp.products'])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('main.account.settings', {
      url: '/settings',
      templateUrl: 'account/settings/settings.html',
      controller: 'MyAccountSettingsCtrl'
      // reloadOnSearch: false
    });
  }
]);
