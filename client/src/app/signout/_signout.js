angular.module('elementBoxApp.signout', [])

.config([ '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('main.signout', {
      url: '/signout',
      templateUrl: 'signout/signout.html',
      controller: ['$rootScope', '$state', 'Session', function($rootScope, $state, Session) {
        $rootScope.$emit('title', 'Sign Out');

        if (Session.getSession() && Session.getSession().user) {
          $state.go('main.home');
          return;
        }

        $rootScope.$emit('app-msg', { txt: 'You are logged out!' });
      }]
    });
  }
]);
