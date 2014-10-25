
angular.module('elementBoxApp.urlConfig', [])

// mode: { 'mock' || 'dev' || 'prod' }
.value('mode', 'dev')
.value('prodBaseUrl', '')

.service('Urls', ['mode', 'prodBaseUrl',
  function(mode,   prodBaseUrl) {
    var urls = {
      mock: {
        elements: 'mocks/elements.json',
        login: 'mocks/elements.json',
        logout: 'mocks/elements.json',
        signup: 'mocks/elements.signup'
      },
      dev: {
        elements: 'api/elements',
        login: 'api/login',
        logout: 'api/logout',
        signup: 'api/users'
      },
      prod: {
        elements: prodBaseUrl + '/api/elements',
        login: prodBaseUrl + 'api/login',
        logout: prodBaseUrl + 'api/logout',
        signup: prodBaseUrl + 'api/users'
      }

    };

    return urls[mode];
  }
]);
