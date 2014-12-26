
angular.module('elementBoxApp.header', [])

.controller('HeaderCtrl', [
          '$scope', '$rootScope', '$location', '$stateParams', 'AuthService', 'AUTH_EVENTS',
  function($scope,  $rootScope,    $location,   $stateParams,   AuthService,   AUTH_EVENTS) {
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
      },

      showUserListLink: function() {
        return $location.path() !== '/userlist';
      },

      signout: function() {
        AuthService.signout($scope.credentials)
          .then(function(res) {
            $rootScope.$broadcast(AUTH_EVENTS.signoutSuccess, res.data.user);
          });
      }
    };

    angular.extend($scope, scope);
  }
]);
