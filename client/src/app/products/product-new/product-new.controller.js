
angular.module('elementBoxApp.products.productNew')

.controller('ProductNewCtrl', [
          '$scope', '$stateParams', 'ProductsService', 'Categories',
  function($scope,   $stateParams,   ProductsService,   Categories) {
    // $scope.categories = Categories.getCategories();

    var CategoryRsr = Categories.getCategoriesTree();
    CategoryRsr
      .query({flat: true})
      .$promise.then(function(res) {
        $scope.categories = res;
      });

    $scope.catalogs = [{
        name: 'Winter',
        filter: 'winter'
      }, {
        name: 'Outum',
        filter: 'outum'
      }, {
        name: 'Summer',
        filter: 'summer'
      }
    ];

    $scope.productCreated = false;

    $scope.product = {
      title: '',
      description: '',
      images: [],
      categories: [],
      style: Math.floor(Math.random()*10000),
      // variants: [{
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
        catalogs: [
          // { 'name': 'Apparel' }
        ]
    };

    $scope.areImgsCollapsed = true;

    $scope.save = function() {
      var categs = [], catags = [];
      $scope.product.categories.forEach(function(p, i) {
        if (p) { categs.push($scope.categories[i]._id); }
      });
      $scope.product.catalogs.forEach(function(p, i) {
        if (p) { catags.push({ name: $scope.catalogs[i].filter }); }
      });

      ProductsService
        .save(angular.extend({}, $scope.product, {categories: categs, catalogs: catags}), function() {
          $scope.productCreated = true;
        });
    };
  }
]);
