
angular.module('elementBoxApp.products.productList')

.controller('ProductsListCtrl', [
          '$scope', '$rootScope', '$state', '$stateParams', '$filter', '$location', 'ProductsService', 'Categories',
  function($scope,   $rootScope,   $state,   $stateParams,   $filter,   $location,   ProductsService,   Categories) {
    $scope.products = [];
    $scope.page = ($stateParams.page) ? parseInt($stateParams.page) : 1; // Setting the current page.
    $scope.pageSize = 10;
    $scope.totalPages = 0;
    $scope.totalProducts = 0;
    $scope.currentCateg = {};
    $scope.expandedNode = {};
    $scope.isLoading = false;
    $scope.categories = [];
    $scope.filter = '';
    var fetchingForFirstTime = true;

    $rootScope.$emit('title', 'Products');

    var init = function() {
      var CategoryRsr = Categories.getCategoriesTree();

      CategoryRsr
        .query({flat: false})
        .$promise.then(function(res) {
          $scope.categories = res;
          setup();
        });
    };

    var setup = function() {
      var flatCategs = parseFlatCategs($scope.categories[0]),
          categ = $filter('filter')(flatCategs, {_id: $stateParams.categ}, true),
          currentCategNbr = categ.length ? flatCategs.indexOf(categ[0]) : 0;

      $scope.currentCateg = flatCategs[currentCategNbr];

      if (fetchingForFirstTime) {
        $scope.page = ($stateParams.page) ? parseInt($stateParams.page) : 1; // Setting the current page.
      }

      $scope.$watch('page', function(newVal, oldVal) {
        if (newVal !== oldVal && !$scope.isLoading) {
          $scope.fetchPage($scope.currentCateg, $scope.page);
        }
      });

      $scope.fetchPage($scope.currentCateg, $scope.page); // fetching the first time.
    };

    $scope.fetchPage = function(categ, toPage) {
      $scope.currentCateg = categ ? categ : $scope.currentCateg;
      $scope.page = (toPage) ? toPage : 1;

      // updateUrl();
      $scope.isLoading = true;

      ProductsService.query({
          category: $scope.currentCateg._id,
          filter: $scope.filter || undefined,
          page: $scope.page,
          pageSize: $scope.pageSize
        })
        .$promise.then(function(res) {
          if (fetchingForFirstTime) { fetchingForFirstTime = false; }
          $scope.products = res.results;
          $scope.page = res.page;
          $scope.totalPages = res.totalPages;
          $scope.totalProducts = res.total;
          $scope.pageSize = res.pageSize;
          $scope.isLoading = false;

          if (window.scrollY > 150) {
            angular.element('body').animate({scrollTop: 150}, 400);
          }
        });
    };

    var parseFlatCategs = function(categ) {
      var res = [];
      res.push(categ);
      if (categ.children) {
        categ.children.forEach(function(child) {
          res.push.apply(res, parseFlatCategs(child));
        });
      }
      return res;
    };

    var getRootNodesScope = function() {
      return angular.element(document.getElementById('tree-root')).scope().$$childHead;
    };

    var updateUrl = function() {
      // $state.transitionTo('main.products.list', $stateParams, {
      //   location: true, // 'replace', //  update url and replace
      //   inherit: true,
      //   notify: true,
      //   relative: $state.$current
      // });
      // $location.search();

      // $location.$$replace = true;

      // $location.search({
      //   categ: $stateParams.categ,
      //   page: $stateParams.page
      // });

      // $stateParams.categ = $scope.currentCateg._id;
      // $stateParams.page = $scope.page;
      // $state.params.categ = $scope.currentCateg._id;
      // $state.params.page = $scope.page;

      $state.go('main.products.list', {
        categ: $scope.currentCateg._id,
        page: $scope.page
      // }, {
      //   location: true,
      //   inherit: true,
      //   notify: false,
      //   // relative: $state.$current
      });

      $state.reload();

      // }, {
      //   location: 'replace',
      //   // replace: true,
      //   inherit: false
    };

    $scope.collapseEverything = function() {
      var scope = getRootNodesScope();
      scope.collapseAll();
    };

    $scope.setExpandedNode = function(node) {
      $scope.expandedNode = node;
    };

    $scope.onSelectCateg = function(categ) {
      if (categ !== $scope.currentCateg && !$scope.isLoading) {
        // For now let it update the url (not local fetch).
        //  Waiting for angular team to add watch to stateParams to chage the url accordingly...
        // $state.go('main.products.list', { categ: categ._id, page: 1 });
        // For the moment lets comment it.
        $scope.filter = ''; // clearing the filter.
        $scope.fetchPage(categ, 1);
      }
    };

    $scope.onSearch = function(str) {
      if ($scope.filter === str) { return; }
      $scope.filter = str;
      $scope.fetchPage($scope.currentCateg, $scope.page);
    };

    init();

  }
]);
