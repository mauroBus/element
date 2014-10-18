
angular.module('elementBoxApp.urlConfig', [])

// mode: { 'mock' || 'dev' || 'prod' }
.value('mode', 'dev')
.value('prodBaseUrl', 'http://somewhere-deployed.com')

.service('Urls', ['mode', 'prodBaseUrl',
  function(mode,   prodBaseUrl) {
    var urls = {
      mock: {
        elements: 'mocks/elements.json'
      },
      dev: {
        elements: 'api/elements'
      },
      prod: {
        elements: prodBaseUrl + '/api/elements'
      }

    };

    return urls[mode];
  }
]);
