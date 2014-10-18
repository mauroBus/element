angular.module('elementBoxApp')

/**
 * Defines a behavior to navigate between the pages.
 * @param {string} url The url to navigate on click.
 */
.directive('go', ['$location',
  function($location) {

    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {
        elem.on('click', function() {
          $location.path(attrs.url);
          scope.$apply(); // this is needed to get the path triggered.
        });
      }
    };

  }
]);
