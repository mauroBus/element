
angular.module('elementBoxApp.account.profile')

.controller('MyAccountProfileCtrl', [
          '$scope', '$rootScope', '$timeout', 'UserService', 'Session',
  function($scope,   $rootScope,   $timeout,   UserService, Session) {

    $scope.user = {};
    $scope.edittingNames = false;
    $scope.changed = false;

    var getUser = function() {
      UserService
        .me()
        .$promise.then(function(data) {
          if (!data) { return; }
          $scope.user = data;
          $scope.changed = false;
        });
    };

    var userSession = Session.getSession();

    if (userSession) {
      $scope.user = Session.getSession().user;
    } else {
      getUser();
    }

    $scope.toggleEditNames = function() {
      $scope.edittingNames = !$scope.edittingNames;
    };

    $scope.saveUser = function() {
      var data = {
        _id: $scope.user._id,
        firstName: $scope.user.firstName,
        lastName: $scope.user.lastName,
        displayName: $scope.user.displayName,
        description: $scope.user.description
      };

      UserService.updateMe(data)
        .$promise.then(function(data) {
          $scope.edittingNames = false;
          if (!data) { return; }
          $scope.user = data;
          $scope.currentUser = data;
          Session.setUser(data);
          $scope.changed = false;
        });
    };

    var onChange = function(newValue, oldValue) {
      if (newValue && oldValue && (newValue !== oldValue)) {
        $timeout(function() {
          $scope.changed = true;
        });
      }
    };

    $scope.$watch('user.lastName', onChange);
    $scope.$watch('user.firstName', onChange);
    $scope.$watch('user.description', onChange);
  }
]);
