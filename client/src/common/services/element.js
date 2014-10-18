
angular.module('elementBoxApp.services', ['ngResource'])

.factory('Element', [
          '$resource', 'Urls', 'Statistics', '$http', 'mode',
  function($resource,   Urls,   Statistics,   $http,   mode) {

    if (mode === 'prod') {
      // getting ready to use an external api
      $http.defaults.useXDomain = true;
    }

    return $resource(Urls.elements + '/:dni', { dni: '@dni' }, {
      query: {
        method: 'GET',
        isArray:true,
        params: {
          //callback: 'JSON_CALLBACK'
        },
        transformResponse: function(data, header) {
          var jsonData = angular.fromJson(data);
          jsonData.forEach(function(element){
            element.attr4 = new Date(element.attr4);
          });

          Statistics.setElementsCount(jsonData.length); // setting the total of elements.
          return jsonData;
        }
      },
      save: {
        method: 'POST',
        params: {
          dni: ''
        }
      },
      update: {
        method: 'PUT',
        params: {
          dni: ''
        }
      },
      get: {
        method: 'GET',
        transformResponse: function(data, header) {
          var element = angular.fromJson(data);
          element.attr4 = new Date(element.attr4);
          return element;
        }
      }
    });
  }
]);

