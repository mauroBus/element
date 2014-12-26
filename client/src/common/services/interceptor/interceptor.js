
angular.module('elementBoxApp.common')

.factory('httpInterceptor', ['$q', '$rootScope', function($q, $rootScope) {
  return {
    //  // optional method
    //  'request': function(config) {
    //    // do something on success
    //    return config;
    //  },

    //  // optional method
    // 'requestError': function(rejection) {
    //    // do something on error
    //    if (canRecover(rejection)) {
    //      return responseOrNewPromise
    //    }
    //    return $q.reject(rejection);
    //  },

    // // optional method
    // 'response': function(response) {
    //   // do something on success
    //   return response;
    // },

    // optional method
    responseError: function(rejection) {
      $rootScope.$broadcast('modal:alert', rejection);
      return $q.reject(rejection);
    }
  };
}]);
