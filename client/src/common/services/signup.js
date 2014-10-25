
angular.module('elementBoxApp.services', ['ngResource'])

.factory('SignUp', [
          '$resource', 'Urls',
  function($resource,   Urls) {

    return $resource(Urls.signup, {}, {
      // save: {
      //   method: 'POST',
      //   params: {
      //     user: '@user',
      //     password: '@password'
      //   }
      // }
    });
  }
]);
