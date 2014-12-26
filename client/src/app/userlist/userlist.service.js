
angular.module('elementBoxApp.userlist')

.factory('UserlistService', ['Urls', '$resource', function(Urls, $resource) {
  var UserlistService = {};

  var Users = $resource(Urls.users.users + '/:email', {email:'@email'}, {
    query: {
      method:'GET',
      isArray:true
    },
    update: {
      method: 'PUT',
    },
    deactivate: {
      method: 'DELETE',
      transformResponse: function(data, headersGetter) {}
    }
    // removeOAuthProvider: {
    //   method: 'DELETE',
    //   url: Urls.users.remove,
    //   params: {
    //     user: function() {
    //       return this.user;
    //     },
    //     provider: 'local'
    //   }
    // }
  });

  return Users;
}]);
