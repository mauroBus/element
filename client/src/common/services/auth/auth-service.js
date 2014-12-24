
angular.module('elementBoxApp.services')

.factory('AuthService', ['$http', 'Session', 'Urls', function($http, Session, Urls) {
  'use strict';

  var authService = {};

  authService.login = function(credentials) {
    var promise = $http({
      url: Urls.login,
      method: 'GET',
      params: credentials
    });

    promise.then(function(res) {
      Session.create(
        res.data.sessionId,
        res.data.user
      );
      return res.data.user;
    },
    function() {
      console.log(credentials);
    });

    return promise;
  };

  authService.logout = function() {
    return $http
      .get(Urls.logout, Session.user)
        .then(function(res) {
          Session.destroy();
        });
  };

  authService.register = function(credentials) {
    return $http
      .post(Urls.signup, credentials)
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
