
angular.module('elementBoxApp.products.productList')

.controller('ProductsListCtrl', [
          '$scope', '$rootScope', '$state', '$stateParams', '$filter', '$location', 'ProductsService', 'Categories',
  function($scope,   $rootScope,   $state,   $stateParams,   $filter,   $location,   ProductsService,   Categories) {
    $scope.products = [];
    $scope.page = ($stateParams.page) ? parseInt($stateParams.page) : 1; // Setting the current page.
    $scope.pageSize = 3;
    $scope.totalPages = 0;
    $scope.totalProducts = 0;
    $scope.currentCateg = {};
    $scope.expandedNode = {};
    $scope.isLoading = false;
    $scope.categories = [];
    var fetchingForFirstTime = true;


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
        $scope.fetchPage(categ, 1);
      }
    };

    $scope.addDefaultProduct = function() {
      // var newProd = {
      //   title: 'My Awesome T-shirt - ' + $scope.products.length,
      //   description: 'All about the details. Of course it\'s black.',
      //   images: [{
      //       kind: 'thumbnail',
      //       url: 'http://placekitten.com/601/300'
      //     }, {
      //       kind: 'thumbnail',
      //       url: 'http://placekitten.com/602/300'
      //     }, {
      //       kind: 'thumbnail',
      //       url: 'http://placekitten.com/603/300'
      //     }, {
      //       kind: 'thumbnail',
      //       url: 'http://placekitten.com/604/300'
      //     }, {
      //       kind: 'thumbnail',
      //       url: 'http://placekitten.com/605/300'
      //     }, {
      //       kind: 'thumbnail',
      //       url: 'http://placekitten.com/606/300'
      //     }, {
      //       kind: 'thumbnail',
      //       url: 'http://placekitten.com/607/300'
      //     }
      //   ],
      //   categories: ['bikes', 'racing'],
      //   style: Math.floor(Math.random()*10000),
      //   variants: [{
      //     color: 'Black',
      //     images: [{
      //         kind: 'thumbnail',
      //         url: 'imgs/products/1.png'
      //       },
      //       {
      //         kind: 'catalog',
      //         url: 'imgs/products/1.png'
      //       }
      //     ],
      //     sizes: [{
      //         size: 'S',
      //         available: 10,
      //         sku: 'CAT-1234-Blk-S',
      //         price: 99.99
      //       },
      //       {
      //         size: 'M',
      //         available: 7,
      //         sku: 'CAT-1234-Blk-M',
      //         price: 109.99
      //       }
      //     ]
      //   }],
      //   catalogs: [
      //     { 'name': 'Apparel' }
      //   ]
      // };

      // var newProd = {
      //   title: 'Default added product',
      //   description: 'products-list.controller.js partials/ added/cloudImgAccountNbr a diqxddkxmukwdqoslhqk CAT-1234-Blk-M pageNbr element setExpandedNode',
      //   // 'cloudImgAccountNbr': 0,
      //   // 'rating': {
      //   //   'history': [10],
      //   //   'value': 10
      //   // },
      //   // 'comments': [
      //   //   {
      //   //     'text': 'AAAAAAAAAAAAAAAHHHHHHHHHH',
      //   //     'createdAt': '2015-04-03T01:09:00.243Z',
      //   //     'user': {
      //   //       'ref': '5511a81ca66a00875e67bf67',
      //   //       'firstName': 'MAURO',
      //   //       'lastName': 'BUSELLI',
      //   //       'displayName': 'SUPER_USER'
      //   //     }
      //   //   }
      //   // ],
      //   'price': 599.99,
      //   // 'user': {
      //   //   'ref': '5511a81ca66a00875e67bf67',
      //   //   'firstName': 'MAURO',
      //   //   'lastName': 'BUSELLI'
      //   // },
      //   // 'modifiedAt': '2015-04-03T01:07:17.588Z',
      //   // 'createdAt': '2015-04-03T01:07:17.588Z',
      //   'categories': [
      //     'coupe'
      //   ],
      //   'images': []
      // };

      var newProd = {
        'title': 'Default added product',
        description: 'products-list.controller.js partials/ added/cloudImgAccountNbr a diqxddkxmukwdqoslhqk CAT-1234-Blk-M pageNbr element setExpandedNode',
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
        'categories': ['coupe'],
      };

      ProductsService.save(newProd, function(prod) {
        $scope.products.push(prod);
      });
    };

    init();

  }
]);
