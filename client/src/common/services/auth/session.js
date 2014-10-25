
angular.module('elementBoxApp.services')

.service('Session', function() {
  this.create = function(sessionId, user, role) {
    this.id = sessionId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.role = role;
  };

  this.destroy = function() {
    this.id = null;
    this.firstName = null;
    this.lastName = null;
    this.email = null;
    this.role = null;
  };

  return this;
});
