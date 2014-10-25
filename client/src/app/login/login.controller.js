
angular.module('elementBoxApp')

.controller('LoginCtrl', [
          '$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService',
  function($scope,   $rootScope,   AUTH_EVENTS,   AuthService) {
    $scope.credentials = {
      username: '',
      password: ''
    };

    $scope.login = function (credentials) {
      AuthService.login(credentials)
        .then(function(user) {
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
          $scope.setCurrentUser(user);
        }, function () {
          $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        });
    };

    // $scope.signIn = function() {
    //   SignIn.save({
    //     user: $scope.user,
    //     password: $scope.password
    //   })
    //   .then(function(err) {
    //     console.log(err);
    //     console.log($scope.user + ' - ' + $scope.password);
    //   });
    // };
  }
]);
