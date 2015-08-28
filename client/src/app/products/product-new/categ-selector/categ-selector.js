
angular.module('elementBoxApp.products.productNew')

.directive('categSelector', function() {
  return {
    restrict:'E',
    scope: {
      categTree: '=',
      onDoneCbk: '=',
      onUndoneCbk: '=',
      api: '='
    },
    templateUrl: 'products/product-new/categ-selector/categ-selector.html',
    controller: ['$scope', function(scope) {

      scope.currentOpts = (scope.categTree) ? scope.categTree.children : []; // options to select.
      scope.selectedPath = [];                  // path of selected categs.
      scope.selectedPath.push(scope.categTree); // pushing the root.
      scope.done = false;
      scope.onDoneCbk = (scope.onDoneCbk && angular.isFunction(scope.onDoneCbk)) ? scope.onDoneCbk : angular.noop;

      scope.api = angular.isObject(scope.api) ? scope.api : {};

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

      var setCategory = function(categId, tree, path) {
        if (tree._id === categId) {
          path.unshift(tree);
          return true;
        } else {
          var rst, successPath = false;
          for (var i in tree.children) {
            rst = setCategory(categId, tree.children[i], path);
            if (rst) {
              path.unshift(tree);
              return true;
            }
          }
        }
      };

      scope.api.setCategory = function(categId) {
        var path = [];
        setCategory(categId, scope.categTree, path);
        scope.selectedPath = path.slice(0, path.length - 2);
        scope.currentOpts = path[path.length - 2].children;
        scope.onSelectNode(path[path.length - 1]);
        // scope.currentOpts = [];
      };

      scope.$watch('categTree', function(newVal, oldVal) {
        scope.currentOpts = (scope.categTree) ? scope.categTree.children : []; // options to select.
        scope.selectedPath = [];                  // path of selected categs.
        scope.selectedPath.push(scope.categTree); // pushing the root.
      });

    }]
  };
});


/*
19 agosto, 2015, 08:45 ART
20 agosto, 2015, 07:00 ART

12651538
Ciancaglini
maciancaglini@gmail.com
mirtacianca
mirta9

*
* print the confirmation page.
* print the application page. (NOT NEEDED)
* provide proof that you have paid the visa application fee and any other fees associated with your
application.
*
* Presentar al Centro de Atenci ón al Solicitante (CAS):
* - código de barras claro y legible.
* - Ingreso a la Embajada: Elementos electrónicos, metálicos y líquidos están prohibidos.
* -
*
*/
