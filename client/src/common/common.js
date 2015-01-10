/**
 * Setup for every common module.
 */
angular.module('elementBoxApp.common', [
  'ngResource'
])

/**
 * Error Constants:
 */
.constant('ERROR_CONSTANTS', {
  forbiden: 'You are not allowed to do this operation.',
  unauthorized: 'You are not authorized to do this operation.',
  byDefault: 'Huhoo! An error has occurred'
})

/**
 * Error Handler:
 */
.factory('ErrorHandler', ['ERROR_CONSTANTS', function(ERROR_CONSTANTS) {
  return {
    translate: function(msg) {
      switch (msg.status) {
        case 400:
          return msg.data && msg.data.message ? msg.data.message : ERROR_CONSTANTS.byDefault;
        case 401:
          return ERROR_CONSTANTS.unauthorized;
        case 403:
          return ERROR_CONSTANTS.forbiden;
        default:
          return ERROR_CONSTANTS.byDefault;
      }
    }
  };
}])

/**
 * Generic Event Names Definition:
 */
.constant('EVENT_NAMES', {
  errorResponse: 'ERROR_RESPONSE'
})

;
