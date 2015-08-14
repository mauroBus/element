
angular.module('elementBoxApp.common')

.factory('Session', function() {
  var Session = {},
      isActive = false,
      data = { id: null, user: {} },
      attrs = ['_id', 'firstName', 'lastName', 'username', 'displayName', 'description', 'email', 'roles'];

  Session.create = function(sessionId, user, role) {
    data.id = sessionId;
    attrs.forEach(function(attr, index) {
      data.user[attr] = user[attr];
    });
    data.user.id = data.user._id;
    isActive = true;
  };

  Session.destroy = function() {
    data.id = null;
    attrs.forEach(function(attr, index) {
      delete data.user[attr];
    });
    isActive = false;
  };

  Session.getSession = function() {
    return isActive ? data : null;
  };

  Session.setUser = function(user) {
    var oldId = data.user._id;
    var oldUsername = data.user.oldUsername;
    attrs.forEach(function(attr, index) {
      data.user[attr] = user[attr];
    });

    data.user.id = oldId;
    data.user._id = oldId;
    data.user.username = oldUsername;
  };

  return Session;
});
