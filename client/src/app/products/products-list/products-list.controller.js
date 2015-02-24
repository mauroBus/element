
angular.module('elementBoxApp.products.productList')

.controller('ProductsListCtrl', [
          '$scope', '$rootScope', '$stateParams', '$filter', 'ProductsService', 'Categories',
  function($scope,   $rootScope,   $stateParams,   $filter,   ProductsService,   Categories) {
    $scope.products = [];
    $scope.page = ($stateParams.pageNbr) ? parseInt($stateParams.pageNbr) : 1; // Setting the current page.
    $scope.pageSize = 3;
    $scope.totalPages = 0;
    $scope.totalProducts = 0;
    // $scope.categories = Categories.getCategories();
    $scope.filter = '';
    $scope.currentCateg = {};
    $scope.expandedNode = {};
    $scope.isLoading = false;
    var fetchingForFirstTime = true;


    var CategoryRsr = Categories.getCategoriesTree();
    CategoryRsr
      .query({flat: false})
      .$promise.then(function(res) {
        $scope.categories = res;
        setup();
      });

    $scope.fetchPage = function(categ, toPage) {
      if (categ) {
        $scope.currentCateg = categ;
        $scope.filter = categ._id;
        $stateParams.categ = categ._id;
        $scope.page = (toPage) ? toPage : 1;
      }

      $scope.isLoading = true;

      ProductsService.query({
          category: $scope.filter,
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
        });
    };

    var setup = function() {
      // if ($stateParams.categ !== '') { // Setting the current category.
        var categ = $filter('filter')($scope.categories, {_id: $stateParams.categ}, true),
            currentCategNbr = categ.length ? $scope.categories.indexOf(categ[0]) : 0;
        $scope.currentCateg = $scope.categories[currentCategNbr];
      // }

      $scope.$watch('page', function(newVal, oldVal) {
        $stateParams.pageNbr = newVal;
        if (fetchingForFirstTime) {
          $scope.page = ($stateParams.pageNbr) ? parseInt($stateParams.pageNbr) : 1; // Setting the current page.
        } else {
          $scope.fetchPage();
        }
      });

      $scope.fetchPage($scope.currentCateg, $scope.page); // fetching the first time.
    };

    var getRootNodesScope = function() {
      return angular.element(document.getElementById('tree-root')).scope().$$childHead;
    };

    $scope.collapseEverything = function() {
      var scope = getRootNodesScope();
      scope.collapseAll();
    };

    $scope.setExpandedNode = function(node) {
      $scope.expandedNode = node;
    };

    $scope.addDefaultProduct = function() {
      var newProd = {
        title: 'My Awesome T-shirt - ' + $scope.products.length,
        description: 'All about the details. Of course it\'s black.',
        images: [{
            kind: 'thumbnail',
            url: 'http://placekitten.com/601/300'
          }, {
            kind: 'thumbnail',
            url: 'http://placekitten.com/602/300'
          }, {
            kind: 'thumbnail',
            url: 'http://placekitten.com/603/300'
          }, {
            kind: 'thumbnail',
            url: 'http://placekitten.com/604/300'
          }, {
            kind: 'thumbnail',
            url: 'http://placekitten.com/605/300'
          }, {
            kind: 'thumbnail',
            url: 'http://placekitten.com/606/300'
          }, {
            kind: 'thumbnail',
            url: 'http://placekitten.com/607/300'
          }
        ],
        categories: ['bikes', 'racing'],
        style: Math.floor(Math.random()*10000),
        variants: [{
          color: 'Black',
          images: [{
              kind: 'thumbnail',
              url: 'imgs/products/1.png'
            },
            {
              kind: 'catalog',
              url: 'imgs/products/1.png'
            }
          ],
          sizes: [{
              size: 'S',
              available: 10,
              sku: 'CAT-1234-Blk-S',
              price: 99.99
            },
            {
              size: 'M',
              available: 7,
              sku: 'CAT-1234-Blk-M',
              price: 109.99
            }
          ]
        }],
        catalogs: [
          { 'name': 'Apparel' }
        ]
      };

      ProductsService.save(newProd, function(prod) {
        $scope.products.push(prod);
      });
    };

  }
]);
