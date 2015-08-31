
angular.module('elementBoxApp.main')

.directive('messageSystem', [
  function() {
    return {
      restrict: 'EA',
      scope: {},
      templateUrl: 'main/message-system/message-system.html',
      controller: ['$scope', '$rootScope', '$timeout', function($scope, $rootScope, $timeout) {

        $scope.msg = {};
        $scope.displayMsg = false;

        var init = function() {
          $rootScope.$on('app-msg', function(ev, msg) {
            $timeout(function() {
              $scope.msg = msg;
              $scope.displayMsg = true;
            });
            $timeout(function() { // auto close.
              $scope.close();
            }, 4000);
          });
        };

        $scope.close = function() {
          $timeout(function() {
            $scope.displayMsg = false;
          });
          $timeout(function() {
            $scope.msg = {};
          }, 2000);
        };

        init();
      }]
    };

  }
]);
