
angular.module('elementBoxApp.services')

.factory('AuthService', ['$http', 'Session', 'Urls', function($http, Session, Urls) {
  'use strict';

  var authService = {};

  authService.signin = function(credentials) {
    return $http
      .get(Urls.userAuth.signin, credentials)
      .then(function(res) {
        Session.create(
          res.data.sessionId,
          res.data.user
        );
        return res.data.user;
      },
      function() {
        // console.log(credentials);
      });
  };

  authService.signout = function() {
    return $http
      .get(Urls.userAuth.signout, Session.user)
        .then(function(res) {
          Session.destroy();
        });
  };

  authService.signup = function(credentials) {
    return $http
      .post(Urls.userAuth.signup, credentials)
      .then(function(res) {
        Session.create(
          res.data.sessionId,
          res.data.user
        );
        return res.data.user;
      });
  };

  authService.isAuthenticated = function() {
    return !!Session.id;
  };

  authService.isAuthorized = function(authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (authService.isAuthenticated() &&
      authorizedRoles.indexOf(Session.userRole) !== -1);
  };

  return authService;
}]);
