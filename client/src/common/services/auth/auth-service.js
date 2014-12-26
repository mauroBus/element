
angular.module('elementBoxApp')

.factory('AuthService', [
        '$http', 'Session', 'Urls', 'AUTH_EVENTS', '$rootScope',
function($http,   Session,   Urls,   AUTH_EVENTS,   $rootScope) {
  'use strict';

  var authService = {};

  authService.signin = function(credentials) {
    var promise = $http({
      url: Urls.userAuth.signin,
      method: 'POST',
      data: credentials
    });

    promise.then(function(res) { // success cbk
      Session.create(
        res.data.sessionId,
        res.data.user
      );
      return res.data.user;
    },
    function(err) { // error cbk
      console.log('signin error: ' + err);
    });

    return promise;
  };

  authService.signout = function() {
    var promise = $http.get(Urls.userAuth.signout);

    promise.then(function(res) {
      Session.destroy();
    });

    return promise;
  };

  authService.signup = function(credentials) {
    var promise = $http.post(Urls.userAuth.signup, credentials);
    promise.then(function(res) {
      Session.create(
        res.data.sessionId,
        res.data.user
      );
      return res.data.user;
    });

    return promise;
  };

  authService.isAuthenticated = function() {
    return !!Session.getSession();
  };

  authService.isAuthorized = function(authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (authService.isAuthenticated() &&
      authorizedRoles.indexOf(Session.userRole) !== -1);
  };

  authService.me = function() {
    var promise = $http.get(Urls.users.me);
    promise.then(function(res) {
      if (!res.data) { return; }
      Session.create(res.data._id, res.data);
      $rootScope.$broadcast(AUTH_EVENTS.singinSuccess, {user: res.data, navigate: false});
    });
    return promise;
  };

  return authService;
}]);
