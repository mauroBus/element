
angular.module('elementBoxApp.services', ['ngResource'])

.factory('SignIn', [
          '$resource', 'Urls',
  function($resource,   Urls) {

    return $resource(Urls.signin, {}, {
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
