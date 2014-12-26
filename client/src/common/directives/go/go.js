angular.module('elementBoxApp.common')

/**
 * Defines a behavior to navigate between the pages.
 * @param {string} url The url to navigate on click.
 */
.directive('go', ['$state',
  function($state) {

    return {
      restrict: 'A',
      // scope: { urlAttr: '=' },
      link: function(scope, elem, attrs) {
        var obj = {};
        obj[attrs.urlattr] = attrs.urlval;

        elem.on('click', function() {
          $state.go(attrs.stateurl, obj);
          // scope.$apply(); // this is needed to get the path triggered.
        });
      }
    };

  }
]);
