
angular.module('elementBoxApp.products.productNew')

.directive('categSelector', function() {
  return {
    restrict:'E',
    scope: {
      categTree: '=',
      onDoneCbk: '=',
      onUndoneCbk: '='
    },
    templateUrl: 'products/product-new/categ-selector/categ-selector.html',
    controller: ['$scope', function(scope) {

      scope.currentOpts = (scope.categTree) ? scope.categTree.children : []; // options to select.
      scope.selectedPath = [];                  // path of selected categs.
      scope.selectedPath.push(scope.categTree); // pushing the root.
      scope.done = false;
      scope.onDoneCbk = (scope.onDoneCbk && angular.isFunction(scope.onDoneCbk)) ? scope.onDoneCbk : angular.noop;

      scope.onSelectNode = function(node) {
        if (scope.done) { return; }

        scope.selectedPath.push(node);

        if (node.children && node.children.length > 0) {
          scope.currentOpts = node.children;
        } else {
          scope.done = true;
          scope.onDoneCbk(scope.selectedPath, scope.selectedPath[scope.selectedPath.length - 1]);
        }
      };

      scope.onPathRestore = function(node, index) {
        if (!node.children || ! node.children.length) { return; }
        scope.currentOpts = node.children;
        scope.selectedPath = scope.selectedPath.slice(0, index+1);
        if (scope.done) {
          scope.done = false;
          scope.onUndoneCbk(scope.selectedPath, node);
        }
      };

      scope.goBack = function() {
        if (scope.selectedPath.length === 1) { return; }
        var lastNode = scope.selectedPath.pop();
        scope.currentOpts = scope.selectedPath[scope.selectedPath.length - 1].children;
        if (scope.done) {
          scope.done = false;
          scope.onUndoneCbk(scope.selectedPath, scope.selectedPath[scope.selectedPath.length - 1]);
        }
        // scope.onDoneCbk(scope.selectedPath, scope.selectedPath[scope.selectedPath.length - 1]);
      };

      scope.$watch('categTree', function(newVal, oldVal) {
        scope.currentOpts = (scope.categTree) ? scope.categTree.children : []; // options to select.
        scope.selectedPath = [];                  // path of selected categs.
        scope.selectedPath.push(scope.categTree); // pushing the root.
      });

    }]
  };
});
