
angular.module('elementBoxApp')

.factory('Session', function() {
  var Session = {},
      isActive = false,
      data = { id: null, user: {} };

  Session.create = function(sessionId, user, role) {
    data.id = sessionId;
    data.user.firstName = user.firstName;
    data.user.lastName = user.lastName;
    data.user.username = user.username;
    data.user.email = user.email;
    data.user.roles = user.roles;
    isActive = true;
  };

  Session.destroy = function() {
    data.id = null;
    data.user.firstName = null;
    data.user.lastName = null;
    data.user.username = null;
    data.user.email = null;
    data.user.roles = null;
    isActive = false;
  };

  Session.getSession = function() {
    return isActive ? data : null;
  };

  return Session;
});
