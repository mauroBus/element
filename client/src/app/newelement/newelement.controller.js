
angular.module('elementBoxApp.newelement')

.controller('NewElementCtrl', [
          '$scope', '$rootScope', '$location', 'Element', 'Statistics',
  function($scope,   $rootScope,   $location,   Element,   Statistics) {
    var scope = {
      newElement: {
        title: '',
        content: '',
        like: '',
        dontLike: '',
        date: ''
      },

      successfulyCreated: false,
      unsuccessfulyCreated: false,

      cancelBtnTxt: 'Cancel and Go Back',

      addElement: function() {
        if (!$rootScope.elements) {
          $rootScope.elements = [];
        }

        var newP = Element.save($scope.newElement);

        newP.$promise.then(
          function() { // success cbk
            $rootScope.elements.push(newP);
            $scope.successfulyCreated = true;
            $scope.unsuccessfulyCreated = false;
            $scope.newElement.title = '';
            $scope.newElement.content = '';
            $scope.newElement.like = 0;
            $scope.newElement.dontLike = 0;
            $scope.newElement.date = '';

            Statistics.elementCreated();
          },
          function() { // error cbk
            $scope.unsuccessfulyCreated = true;
            $scope.successfulyCreated = false;
          }
        );
      },

      today: new Date()
    };

    angular.extend($scope, scope);
  }
]);
