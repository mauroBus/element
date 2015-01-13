
angular.module('elementBoxApp.common')

.factory('Categories', [function() {
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
      }
    };
  }
]);
