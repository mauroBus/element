
angular.module('elementBoxApp.products')

.factory('CommentsService', ['Urls', '$resource', function(Urls, $resource) {

  var Comments = $resource(Urls.products.products + '/:prodId/comments/:commentId', {
    prodId: '@prodId',
    commentId: '@commentId'
  }, {
    query: {
      method: 'GET',
      isArray: false,
      transformResponse: function(data, headersGetter) {
        var jsonData = JSON.parse(data);
        jsonData.results.forEach(function(res, i) {
          jsonData.results[i] = new Comments(res);
        });
        return jsonData;
      }
    }
  });

  return Comments;
}]);
