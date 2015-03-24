
angular.module('elementBoxApp.products.productList')

.directive('categTree', function () {
  return {
    restrict:'E',
    transclude: true,
    replace: false,
    scope: {
      selectcbk: '='
    },
    template: '<div class="category-tree" ng-transclude></div>',
    controller: ['$scope', function ($scope) {
      this.groups = [];

      this.selectcbk = $scope.selectcbk ? $scope.selectcbk : this.selectcbk;

      this.closeOthers = function(openGroup) {
        angular.forEach(this.groups, function (group) {
          if (group !== openGroup) {
            group.isOpen = false;
          }
        });
      };

      this.addGroup = function(groupScope) {
        var that = this;
        this.groups.push(groupScope);

        groupScope.$on('$destroy', function (event) {
          that.removeGroup(groupScope);
        });
      };

      this.removeGroup = function(group) {
        var index = this.groups.indexOf(group);
        if (index !== -1) {
          this.groups.splice(index, 1);
        }
      };

      this.select = function(node) {
        if (this.selectcbk && angular.isFunction(this.selectcbk)) {
          this.selectcbk(node);
        }
      };

    }]
  };
})

.directive('categTreeNode', function() {
  return {
    require: '^categTree',
    restrict: 'E',
    transclude: true,
    // replace: true,
    templateUrl: 'products/products-list/categ-tree/categ-tree-node.html',
    link: function(scope, element, attrs, accordionCtrl) {
      accordionCtrl.addGroup(scope);

      scope.isOpen = (attrs.isOpen && attrs.isOpen === 'true') ? true : false;

      scope.$watch('isOpen', function(value) {
        if ( value ) {
          accordionCtrl.closeOthers(scope);
        }
      });

      scope.toggleOpen = function() {
        if ( !scope.isDisabled ) {
          scope.isOpen = !scope.isOpen;
        }
      };

      scope.select = function(node) {
        accordionCtrl.select(node);
      };
    }
  };
})
;
