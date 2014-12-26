
angular.module('elementBoxApp.common')

// Attrs:
// - title
// - content
// - created
// - date
// - like
// - dontLike
.factory('Element', [
          '$resource', 'Urls', '$http', 'mode',
  function($resource,   Urls,   $http,   mode) {

    if (mode === 'prod') {
      // getting ready to use an external api
      $http.defaults.useXDomain = true;
    }

    return $resource(Urls.elements + '/:id', { id: '@_id' }, {
      query: {
        method: 'GET',
        isArray:true,
        params: {
          //callback: 'JSON_CALLBACK'
        },
        transformResponse: function(data, header) {
          var jsonData = angular.fromJson(data);
          jsonData.forEach(function(element) {
            element.date = new Date(element.date);
            element.created = new Date(element.created);
          });
          return jsonData;
        }
      },
      save: {
        method: 'POST',
        params: {}
      },
      update: {
        method: 'PUT',
        params: {}
      },
      get: {
        method: 'GET',
        transformResponse: function(data, header) {
          var element = angular.fromJson(data);
          element.created = new Date(element.created);
          element.date = new Date(element.date);
          return element;
        }
      },

      doLike: {
        method: 'PUT',
        params: {
          title: '',
          content: '',
          created: '',
          date: '',
          dontLike: ''
        }
      },

      dontLike: {
        method: 'PUT',
        params: {
          title: '',
          content: '',
          created: '',
          date: '',
          like: ''
        }
      }

    });
  }
]);

