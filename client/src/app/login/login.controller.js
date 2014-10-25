
angular.module('elementBoxApp')

.controller('LoginCtrl', [
          '$scope', 'SignIn', 'SignUp',
  function($scope,   SignIn,   SignUp) {
    $scope.user = '';
    $scope.password = '';

    $scope.signIn = function() {
      Sign.save({
        user: $scope.user,
        password: $scope.password
      })
      .then(function(err) {
        console.log(err);
        console.log($scope.user + ' - ' + $scope.password);
      });
    };
  }
]);
