
angular.module('elementBoxApp.products')

.factory('CommentsService', ['Urls', '$resource', function(Urls, $resource) {

  var Comments = $resource(Urls.products.products + '/:prodId/comments/:commentId', {
    prodId: '@prodId',
    commentId: '@commentId'
  }, {
    query: {
      method: 'GET',
      isArray: false,
      transformResponse: function(data, headersGetter, status) {
        var jsonData = JSON.parse(data);
        if (status >= 200 && status < 300) {
          jsonData.results.forEach(function(res, i) {
            jsonData.results[i] = new Comments(res);
          });
        } else {
          jsonData.results = [];
        }
        return jsonData;
      },
      params: { SILENT_ON_ERROR: true }
    }
  });

  return Comments;
}]);
