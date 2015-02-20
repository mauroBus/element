
angular.module('elementBoxApp.products')

.factory('ProductsService', ['Urls', '$resource', function(Urls, $resource) {

  var Products = $resource(Urls.products.products + '/:id', {id:'@_id'}, {
    query: {
      method: 'GET',
      isArray: false,
      transformResponse: function(data, headersGetter, status) {
        var jsonData = JSON.parse(data);
        if (status >= 200 && status < 300) {
          jsonData.results.forEach(function(res, i) {
            jsonData.results[i] = new Products(res);
          });
        } else {
          jsonData.results = [];
        }
        return jsonData;
      }
    },
    update: {
      method: 'PUT'
    },
    rate: {
      method: 'PUT',
      url: Urls.products.products + '/:id/rate'
    }
  });

  return Products;
}]);
