
angular.module('elementBoxApp.common')

.factory('httpInterceptor', [
            '$q', '$rootScope', 'EVENT_NAMES',
    function($q,   $rootScope,   EVENT_NAMES) {
  return {

    // request: function(config) {
    //   // do something on success
    //   return config;
    // },

    // 'requestError': function(rejection) {
    //    // do something on error
    //    if (canRecover(rejection)) {
    //      return responseOrNewPromise
    //    }
    //    return $q.reject(rejection);
    //  },

    // 'response': function(response) {
    //   // do something on success
    //   return response;
    // },

    // default error handler, only applied if "SILENT_ON_ERROR" has not been setted.
    responseError: function(rejection) {
      if (!rejection.config.params || !rejection.config.params.SILENT_ON_ERROR) {
        // by default, it shows an alert modal to treat the error.
        $rootScope.$broadcast(EVENT_NAMES.errorResponse, rejection);
      }
      return $q.reject(rejection);
    }
  };
}]);
