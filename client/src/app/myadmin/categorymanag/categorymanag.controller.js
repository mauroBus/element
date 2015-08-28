
angular.module('elementBoxApp.myadmin.categorymanag')

.controller('CategoryManagCtrl', [
          '$scope', '$rootScope', '$location', '$modal', 'Categories',
  function($scope,   $rootScope,   $location,   $modal,   Categories) {
    $scope.rootCategory = {};
    var CategoryRsr = Categories.getCategoriesTree();

    CategoryRsr
      .query({flat: false})
      .$promise
        .then(function(res) { // success cbk
          $scope.rootCategory = res;
        }, function() { // error cbk
          $scope.rootCategory = [];
        });

    $scope.remove = function(scope) {
      scope.remove();
    };

    $scope.toggle = function(scope) {
      scope.toggle();
    };

    $scope.newSubItem = function(scope) {
      var nodeData = scope.$modelValue;
      nodeData.children.push({
        _id: nodeData._id + (nodeData.children.length + 1),
        name: nodeData.name + '-' + (nodeData.children.length + 1),
        thumb: '',
        children: []
      });
    };

    var getRootNodesScope = function() {
      return angular.element(document.getElementById('tree-root')).scope().$$childHead;
    };

    $scope.collapse = function() {
      var scope = getRootNodesScope();
      scope.collapseAll();
    };

    $scope.expand = function() {
      var scope = getRootNodesScope();
      scope.expandAll();
    };

    $scope.save = function() {
      CategoryRsr.save({ tree: JSON.stringify($scope.rootCategory) }, function() {
        console.log(arguments);
      });
    };



    $scope.edit = function(categ) {

      var modalInstance = $modal.open({
        controller: ['$scope', function($scope) {
          $scope.categ = angular.copy(categ);
          $scope.applyCategChanges = function(valid, changedCateg) {
            if (valid) {
              angular.copy($scope.categ, categ);
              modalInstance.close();
            }
          };
          $scope.cancelEdditing = function() {
            modalInstance.close();
          };
        }],
        templateUrl: 'myadmin/categorymanag/partials/category-edit.html',
        size: 'lg',
        backdrop: 'static'
      });

    };

    $scope.createRootCategory = function() {
      $scope.rootCategory.push({
        _id: 'products',
        name: 'Products',
        children: []
      });
    };

  }
]);
