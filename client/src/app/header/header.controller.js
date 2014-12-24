
angular.module('elementBoxApp.header', [])

.controller('HeaderCtrl', [
          '$scope', '$location', '$stateParams',
  function($scope,   $location,   $stateParams) {
    var scope = {
      title: 'Element SandBox',

      subPageName: function() {
        if ($location.path() === '/home') {
          return 'Home Page';
        }
        if ($location.path() === '/newelement') {
          return 'New Element Page';
        }
        if ($location.path() === '/about') {
          return 'About Page';
        }
        if ($stateParams.dni) {
          return 'Element dni:' + $stateParams.dni + ' Info';
        }
      },

      showHomeLink: function() {
        return $location.path() !== '/home';
      },

      showNewElementLink: function() {
        return $location.path() !== '/newelement';
      },

      showAboutLink: function() {
        return $location.path() !== '/about';
      }
    };

    angular.extend($scope, scope);
  }
]);
