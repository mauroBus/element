
angular.module('elementBoxApp.products.controller', [])

.controller('ProductsCtrl', [
          '$scope', '$rootScope', 'ProductsService', 'Categories',
  function($scope,   $rootScope,   ProductsService,   Categories) {
    $scope.products = [];
    $scope.page = 1;
    $scope.pageSize = 3;
    $scope.totalPages = 0;
    $scope.totalProducts = 0;
    $scope.categories = Categories.getCategories();
    $scope.filter = '';
    $scope.selectedCateg = $scope.categories[0].name;

    $scope.fetchPage = function(categ) {
      if (categ) {
        $scope.selectedCateg = categ.name;
        $scope.filter = categ.filter;
        $scope.page = 1;
      }

      ProductsService.query({
          category: $scope.filter,
          page: $scope.page,
          pageSize: $scope.pageSize
        })
        .$promise.then(function(res) {
          $scope.products = res.results;
          $scope.page = res.page;
          $scope.totalPages = res.totalPages;
          $scope.totalProducts = res.total;
          $scope.pageSize = res.pageSize;
        });
    };

    $scope.fetchPage(); // fetching the first page.

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
