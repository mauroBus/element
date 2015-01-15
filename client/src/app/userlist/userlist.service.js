
angular.module('elementBoxApp.userlist')

.factory('UserlistService', ['Urls', '$resource', function(Urls, $resource) {
  var Users = $resource(Urls.users.users + '/:email', {email:'@email'}, {
    query: {
      method:'GET',
      // isArray:true
      isArray: false,
      transformResponse: function(data, headersGetter) {
        var jsonData = JSON.parse(data);
        jsonData.results.forEach(function(res, i) {
          jsonData.results[i] = new Users(res);
        });
        return jsonData;
      }
    },
    update: {
      method: 'PUT',
    },
    deactivate: {
      method: 'DELETE',
      transformResponse: function(data, headersGetter) {}
    }
  });

  return Users;
}]);
