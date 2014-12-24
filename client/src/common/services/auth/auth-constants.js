
angular.module('elementBoxApp.services')

.constant('AUTH_EVENTS', {
  singinSuccess: 'auth-login-success',
  singinFailed: 'auth-login-failed',
  signoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})

.constant('USER_ROLES', {
  editor: 'EDITOR',
  admin: 'ADMIN',
  user: 'USER'
});
