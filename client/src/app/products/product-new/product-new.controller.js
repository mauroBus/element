
angular.module('elementBoxApp.products.productNew.controller', [])

.controller('ProductNewCtrl', [
          '$scope', '$stateParams', 'ProductsService', 'Categories',
  function($scope,   $stateParams,   ProductsService,   Categories) {
    $scope.categories = Categories.getCategories();
    $scope.catalogs = [{
        name: 'winter'
      }, {
        name: 'outum'
      }, {
        name: 'summer'
      }
    ];

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

    $scope.save = function() {
      var categs = [], catags = [];
      $scope.product.categories.forEach(function(p, i) {
        if (p) { categs.push($scope.categories[i]); }
      });
      $scope.product.catalogs.forEach(function(p, i) {
        if (p) { catags.push($scope.catalogs[i]); }
      });

      ProductsService.save(angular.extend({}, $scope.product, {categories: categs, catalogs: catags}));
    };
  }
]);