angular.module('elementBoxApp.common')

.directive('goBackBtn', ['$window',
  function($window) {

    return {
      // templateUrl: 'common/directives/goback/go-back.html'
      template: '{{btntxt}}',
      restrict: 'A',
      scope: {
        btntxt: '@'
      },
      link: function(scope, elem, attrs) {
        elem.on('click', function() {
          $window.history.back();
        });
      }
    };

  }
]);
