angular.module('elementBoxApp.common')

.directive('droppable', function() {
  return {
    restrict: 'A',
    scope: {
      drop: '&',
      dropRef: '='
    },
    link: function(scope, element) {
      var el = element[0];

      el.addEventListener('dragover', function(e) {
          e.dataTransfer.dropEffect = 'move';
          // allows us to drop
          if (e.preventDefault) { e.preventDefault(); }
          this.classList.add('over');
          return false;
        }, false
      );

      el.addEventListener( 'dragenter', function(e) {
          this.classList.add('over');
          return false;
        }, false
      );

      el.addEventListener('dragleave', function(e) {
          this.classList.remove('over');
          return false;
        }, false
      );

      el.addEventListener('drop', function(e) {
          if (e.stopPropagation) { e.stopPropagation(); }
          this.classList.remove('over');

          // var binId = this.id;
          // var item = document.getElementById(e.dataTransfer.getData('Text'));
          // this.appendChild(item);
          // call the passed drop function
          scope.$apply(function(scope) {
            var fn = scope.drop();
            if (typeof fn !== 'undefined') {
              fn(e.dataTransfer.getData('drag-ref'), scope.dropRef);
            }
          });

          return false;
        }, false
      );

    }
  };
});
