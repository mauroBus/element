
angular.module('elementBoxApp.common')

.factory('Categories', [function() {
    return {
      getCategories: function() {
        // Fixed hardcoded categories for now...
        return [{
            name: 'cars'
          },{
            name: 'rent'
          },{
            name: 'sale'
          },{
            name: 'appartments'
          },{
            name: 'houses'
          },{
            name: 'bikes'
          }, {
            name: 'motorbikes'
          }, {
            name: 'Clothes'
          }, {
            name: 'Shirts'
          }
        ];
      }
    };
  }
]);
