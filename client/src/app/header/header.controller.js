
angular.module('elementBoxApp')

.controller('HeaderCtrl', [
          '$scope', '$location', '$routeParams',
  function($scope,   $location,   $routeParams) {
    var scope = {

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
        if ($routeParams.dni) {
          return 'Element dni:' + $routeParams.dni + ' Info';
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
