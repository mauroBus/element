
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
        // Setting up the users profile api
        users: {
          me: '/users/me',
          users: '/users', // to update.
          accounts: '/users/accounts', // to delete.
          // Users password api:
          changePass: '/users/password',
          forgotPass: '/auth/forgot',
          resetPass: '/auth/reset/:token'
        },
        userAuth: { // Setting up the users authentication api
          signup: '/auth/signup',
          signin: '/auth/signin',
          signout: '/auth/signout'
        },
        facebook: {// Setting the facebook oauth routes
          url: '/auth/facebook',
          cbk: '/auth/facebook/callback'
        },
        twitter: {// Setting the twitter oauth routes
          url: '/auth/twitter',
          cbk: '/auth/twitter/callback'
        },
        google: {// Setting the google oauth routes
          url: '/auth/google',
          cbk: '/auth/google/callback'
        },
        linkedin: {// Setting the linkedin oauth routes
          url: '/auth/linkedin',
          cbk: '/auth/linkedin/callback'
        },
        github: {// Setting the github oauth routes
          url: '/auth/github',
          cbk: '/auth/github/callback'
        }
      },
      prod: {
        elements: prodBaseUrl + '/api/elements',
        login: prodBaseUrl + 'api/login',
        logout: prodBaseUrl + 'api/logout',
        signup: prodBaseUrl + 'api/register'
      }

    };

    return urls[mode];
  }
]);
