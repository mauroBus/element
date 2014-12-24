
angular.module('elementBoxApp.userlist')

.service('UserlistService', ['Urls', '$http', '$q',
  function(Urls, $http, $q) {
    
    this.getUsers = function() {
      var dfd = $q.defer();
      $http.get(Urls.users.users)
        .then(function(res) {
          dfd.resolve(res.data);
        });
      return dfd.promise;
    };

    this.removeUser = function(user) {
      var dfd = $q.defer();
      $http.delete(Urls.users.accounts, user._id)
        .then(function(res) {
          dfd.resolve(res.data);
        });
      return dfd.promise;
    };
  }
]);
