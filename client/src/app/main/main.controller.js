angular.module('elementBoxApp.main')

.controller('MainCtrl', ['$state', function($state) {
    if ($state.current.name === 'main') {
      $state.go('main.home');
    }
  }
]);
