
angular.module('elementBoxApp.password.forgot')

.controller('ForgotPassCtrl', ['$scope', '$rootScope', 'UserService', function($scope, $rootScope, UserService) {
    $rootScope.$emit('title', 'TITLE_FORGOT_PASS');

    $scope.email = '';
    $scope.showErrors = false;
    $scope.error = null;
    $scope.showErrorAlert = false;
    $scope.inProgress = false;
    $scope.success = false;

    $scope.onForgotPass = function() {
      if ($scope.inProgress || $scope.success) { return; }

      $scope.showErrorAlert = false;
      $scope.showErrors = false;
      $scope.inProgress = true;
      $scope.error = null;

      UserService.forgotPass({
        email: $scope.email
      })
        .$promise.then(function(data) { // success cbk
          $scope.success = true;
          $scope.inProgress = false;
        }, function(err) { // error cbk
          $scope.error = err.data ? err.data.message : 'PASSWORD.DEFAULT_ERROR';
          $scope.showErrors = true;
          $scope.showErrorAlert = true;
          $scope.inProgress = false;
        });
    };

  }
]);
