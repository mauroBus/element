
angular.module('elementBoxApp.products')

.factory('ProductsService', ['Urls', '$resource', function(Urls, $resource) {
  var Products = $resource(Urls.products.products + '/:id', {id:'@_id'}, {
    query: {
      method:'GET',
      isArray:true
    },
    update: {
      method: 'PUT',
    }
    // get: {
    //   method:'GET',
    //   url: Urls.products.products + '/:id'
    // }
  });

  return Products;
}]);
