
angular.module('elementBoxApp.services')

.factory('AuthService', ['$http', 'Session', 'Urls', function($http, Session, Urls) {
  var authService = {};

  authService.login = function(credentials) {
    return $http
      .post(Urls.login, credentials)
      .then(function(res) {
        Session.create(res.data.id, res.data.user.id,
                       res.data.user.role);
        return res.data.user;
      });
  };

  authService.logout = function() {
    return $http
      .post(Urls.logout, Session.user)
      .then(function(res) {
      });
  };

  authService.isAuthenticated = function() {
    return !!Session.userId;
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
