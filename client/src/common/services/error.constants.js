
angular.module('elementBoxApp')

.constant('ERROR_CONSTANTS', {
  forbiden: 'You are not allowed to do this operation.',
  unauthorized: 'You are not authorized to do this operation.',
  byDefault: 'Huhoo! An error has occurred'
})

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
}]);