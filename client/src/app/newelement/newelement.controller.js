
angular.module('elementBoxApp')

.controller('NewElementCtrl', [
          '$scope', '$rootScope', '$location', 'Element', 'Statistics',
  function($scope,   $rootScope,   $location,   Element,   Statistics) {
    var scope = {
      newElement: {
        attr1: '',
        attr2: '',
        attr3: '',
        attr4: ''
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
            $scope.newElement.attr1 = '';
            $scope.newElement.attr2 = '';
            $scope.newElement.attr3 = '';
            $scope.newElement.attr4 = '';

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
