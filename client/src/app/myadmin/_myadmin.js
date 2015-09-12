
angular.module('elementBoxApp.myadmin', [
  'elementBoxApp.myadmin.categorymanag',
  'elementBoxApp.myadmin.userlist',
  'elementBoxApp.myadmin.myitems',
  'elementBoxApp.myadmin.allitems',
  'ui.tree'
])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('main.myadmin', {
      url: '/myadmin',
      templateUrl: 'myadmin/myadmin.html',
      controller: 'MyAdminCtrl'
    });

    $stateProvider.state('main.myadmin.mywishlist', {
      url: '/mywishlist',
      templateUrl: 'account/mywishlist/mywishlist.html',
      controller: 'MyWishListCtrl'
    });

    $stateProvider.state('main.myadmin.profile', {
      url: '/profile',
      templateUrl: 'account/profile/profile.html',
      controller: 'MyAccountProfileCtrl'
      // reloadOnSearch: false
    });

    $stateProvider.state('main.myadmin.settings', {
      url: '/settings',
      templateUrl: 'account/settings/settings.html',
      controller: 'MyAccountSettingsCtrl'
    });
  }
]);
