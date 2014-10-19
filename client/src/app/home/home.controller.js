
angular.module('elementBoxApp')

.controller('HomeCtrl', [
          '$scope', '$rootScope', '$timeout', '$location', 'Element', 'Statistics',
  function($scope,   $rootScope,   $timeout,   $location,   Element,   Statistics) {

    var votedElems = {};

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
          }
        );

        votedElems[id] = true;
      },

      doDontLike: function(index, id) {
        var elem = $rootScope.elements[index];
        Element.doLike({
            id: id
          }, {
            dontLike: elem.dontLike - 1
          },
          function() { // success
            elem.dontLike--;
          }
        );

        votedElems[id] = true;
      },

      voted: function(id) {
        return votedElems[id];
      }
    };

    $rootScope.elements = Element.query();

    angular.extend($scope, scope);
  }
]);
