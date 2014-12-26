
angular.module('elementBoxApp')

.factory('Statistics', function() {
  var statistics = [
    {
      key: 'Removed',
      y: 0
    },
    {
      key: 'Created',
      y: 0
    },
    {
      key: 'Updated',
      y: 0
    },
    {
      key: 'Total Elements',
      y: 0

    }
  ];

  return {
    elementRemoved: function() {
      statistics[0].y++;
      statistics[3].y--;
    },
    elementCreated: function() {
      statistics[1].y++;
      statistics[3].y++;
    },
    elementUpdated: function() {
      statistics[2].y++;
    },
    setElementsCount: function(count) {
      statistics[3].y = count;
    },

    getData: function() {
      return statistics;
    },

    xFunction: function() {
      return function(d) {
        return d.key;
      };
    },

    yFunction: function() {
      return function(d) {
        return d.y;
      };
    },

    description: function() {
      return function(d) {
        return d.key + ': ' + d.y;
      };
    },

    tooltipContent: function() {
      return function(key, x, y, e, graph) {
        return '<span class="label label-default"' +
          // 'x='' + y.pos[0] + ''' + ' y='' + y.pos[1] +
          '>' + key + '</span>';
      };
    }

  };
});
