angular.module('elementBoxApp.common')

.directive('draggable', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var el = element[0];
      el.draggable = true;

      el.addEventListener('dragstart', function(e) {
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.setData('drag-ref', scope.$eval(attrs.dragRef));
          this.classList.add('drag');
          return false;
        }, false
      );

      el.addEventListener('dragend', function(e) {
          this.classList.remove('drag');
          return false;
        }, false
      );
    }

  };
});
