
angular.module('elementBoxApp.products')

.factory('ProductsService', ['Urls', '$resource', function(Urls, $resource) {

  var Products = $resource(Urls.products.products + '/:id', {id:'@_id'}, {
    query: {
      method: 'GET',
      isArray: false,
      transformResponse: function(data, headersGetter) {
        var jsonData = JSON.parse(data);
        jsonData.results.forEach(function(res, i) {
          jsonData.results[i] = new Products(res);
        });
        return jsonData;
      }
    },
    update: {
      method: 'PUT',
    }
  });

  return Products;
}]);
