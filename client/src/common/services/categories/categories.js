
angular.module('elementBoxApp.common')

.factory('Categories', ['Urls', '$resource', function(Urls, $resource) {
    return {
      getCategories: function() {
        // Fixed hardcoded categories for now...
        return [{
            name: 'All',
            filter: ''
          }, {
            name: 'Cars',
            filter: 'cars'
          },{
            name: 'Rent',
            filter: 'rent'
          },{
            name: 'Sale',
            filter: 'sale'
          },{
            name: 'Appartments',
            filter: 'appartments'
          },{
            name: 'Houses',
            filter: 'houses'
          },{
            name: 'Bikes',
            filter: 'bikes'
          }, {
            name: 'Motorbikes',
            filter: 'motorbikes'
          }, {
            name: 'Clothes',
            filter: 'Clothes'
          }, {
            name: 'Shirts',
            filter: 'Shirts'
          }
        ];
      },

      getCategoriesTree: function() {
        var CategoryTree = $resource(Urls.categories.url, {}, {
          query: {
            method: 'GET',
            isArray: true,
            // transformResponse: function(data, headersGetter) {
            //   var jsonData = JSON.parse(data);
            //   jsonData.forEach(function(res, i) {
            //     jsonData[i] = new CategoryTree(res);
            //   });
            //   return jsonData;
            // }
          },
          save: {
            method: 'POST',
            isArray: true
          }
        });

        return CategoryTree;
      }

    };
}]);
