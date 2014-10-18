
angular.module('elementBoxApp.urlConfig', [])

// mode: { 'mock' || 'dev' || 'prod' }
.value('mode', 'dev')
.value('prodBaseUrl', 'http://something.com')

.service('Urls', ['mode', 'prodBaseUrl',
  function(mode,   prodBaseUrl) {
    var urls = {
      mock: {
        elements: 'mocks/elements.json'
      },
      dev: {
        // TODO: list of service urls...
        elements: 'api/todos'
      },
      prod: {
        elements: prodBaseUrl + '/api/elements'
      }

    };

    return urls[mode];
  }
]);
