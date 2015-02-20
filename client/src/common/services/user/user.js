
angular.module('elementBoxApp.common')

.factory('UserService', ['$http', '$resource', 'Urls', function($http, $resource, Urls) {
  'use strict';

  // me: '/users/me',
  // users: '/users/:email', // to update / get / deactivate.
  // remove: '/users/accounts', // to delete.
  // changePass: '/users/password',

  var Users = $resource(Urls.users.users + '/:id', {
      id:'@_id',
      prodId: '@prodId',
      itemId: '@itemId'
    }, {
    query: {
      method: 'GET',
      isArray: false,
      transformResponse: function(data, headersGetter, status) {
        var jsonData = JSON.parse(data);
        if (status >= 200 && status < 300) {
          jsonData.results.forEach(function(res, i) {
            jsonData.results[i] = new Users(res);
          });
        } else {
          jsonData.results = [];
        }
        return jsonData;
      }
    },
    update: {
      method: 'PUT',
    },
    deactivate: {
      method: 'DELETE',
      transformResponse: function(data, headersGetter) {} // do not allowing to reset the user object data (happens by default).
    },
    // changePass: {},

    me: {
      url: Urls.users.me,
      method: 'GET'
    },

    // User wish list:
    addToWishList: {
      url: Urls.users.users + '/wishlist/:prodId',
      method: 'POST',
    },
    removeFromWishList: {
      url: Urls.users.users + '/wishlist/:itemId',
      method: 'DELETE',
    },
    queryWishList : {
      url: Urls.users.users + '/wishlist',
      method: 'GET',
    }
  });

  return Users;
}]);
