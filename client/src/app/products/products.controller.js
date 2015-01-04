
angular.module('elementBoxApp.products.controller', [])

.controller('ProductsCtrl', [
          '$scope', '$rootScope', 'ProductsService', 'Categories',
  function($scope,   $rootScope,   ProductsService,   Categories) {

    $scope.products = ProductsService.query();
    $scope.categories = Categories.getCategories();

    $scope.filterProducts = function(categ) {
      $scope.products = ProductsService.query({
        category: categ.name
      });
      $scope.selectedCateg = categ.name;
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
        categories: [
          { 'name': 'Clothes' },
          { 'name': 'Shirts' }
        ],
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
