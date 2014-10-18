
angular.module('elementBoxApp.urlConfig', [])

// mode: { 'mock' || 'dev' || 'prod' }
.value('mode', 'prod')
.value('prodBaseUrl', 'http://something.com')

.service('Urls', ['mode', 'prodBaseUrl',
  function(mode,   prodBaseUrl) {
    var urls = {
      mock: {
        elements: 'mocks/elements.json'
      },
      dev: {
        // TODO: list of service urls...
        elements: 'api/elements'
      },
      prod: {
        elements: prodBaseUrl + '/api/elements'
      }

    };

    return urls[mode];
  }
]);
