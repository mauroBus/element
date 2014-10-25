
angular.module('elementBoxApp.urlConfig', [])

// mode: { 'mock' || 'dev' || 'prod' }
.value('mode', 'dev')
.value('prodBaseUrl', '')

.service('Urls', ['mode', 'prodBaseUrl',
  function(mode,   prodBaseUrl) {
    var urls = {
      mock: {
        elements: 'mocks/elements.json',
        signin: 'mocks/elements.json',
        signup: 'mocks/elements.json'
      },
      dev: {
        elements: 'api/elements',
        signin: 'api/singin',
        signup: 'api/logout'
      },
      prod: {
        elements: prodBaseUrl + '/api/elements',
        signin: prodBaseUrl + 'api/singin',
        signup: prodBaseUrl + 'api/logout'
      }

    };

    return urls[mode];
  }
]);
