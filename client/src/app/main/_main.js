
angular.module('elementBoxApp.main', [])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('main', {
      url: '',
      templateUrl: 'main/main.html',
      // resolve: {
      //   me: ['AuthService', function(AuthService) {
      //     // When app starts checking if user is signed in (cookies).
      //     return AuthService.me();
      //   }]
      // },
      controller: 'MainCtrl'
    });
  }
]);
