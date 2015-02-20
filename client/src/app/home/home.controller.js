
angular.module('elementBoxApp.home')

.controller('HomeCtrl', [
          '$scope', '$rootScope', '$timeout', '$location', 'Element', 'Statistics',
  function($scope,   $rootScope,   $timeout,   $location,   Element,   Statistics) {

    var votedElems = {};

    $scope.page = 1;
    $scope.pageSize = 3;
    $scope.totalPages = 0;
    $scope.totalProducts = 0;
    $rootScope.elements = [];

    $scope.fetchPage = function() {
      Element.query({
          page: $scope.page,
          pageSize: $scope.pageSize
        })
        .$promise.then(function(res) {
          $rootScope.elements = res.results;
          $scope.page = res.page;
          $scope.pageSize = res.pageSize;
          $scope.totalPages = res.totalPages;
          $scope.totalElements = res.total;
        });
    };

    $scope.fetchPage();

    var scope = {
      remove: function(index, $event) {
        var elementToRem = $rootScope.elements[index];
        Element.delete({id: elementToRem._id}, function() { // success cbk
          $rootScope.elements.splice(index, 1);
        });

        Statistics.elementRemoved();

        $event.stopPropagation();
      },

      doLike: function(index, id) {
        var elem = $rootScope.elements[index];
        Element.doLike({
            id: id
          }, {
            like: elem.like + 1
          },
          function() { // success
            elem.like++;
            votedElems[id] = true;
          }
        );
      },

      doDontLike: function(index, id) {
        var elem = $rootScope.elements[index];
        Element.doLike({
            id: id
          }, {
            dontLike: elem.dontLike + 1
          },
          function() { // success
            elem.dontLike++;
            votedElems[id] = true;
          }
        );
      },

      voted: function(id) {
        return votedElems[id];
      }
    };

    angular.extend($scope, scope);
  }
]);
