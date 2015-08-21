var config = require('../config');

module.exports = {
  facebook: {
    clientID: 'APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: config.host + ':' + config.ipaddr + '/auth/facebook/callback'
  },
  twitter: {
    clientID: 'CONSUMER_KEY',
    clientSecret: 'CONSUMER_SECRET',
    callbackURL: config.host + ':' + config.ipaddr + '/auth/twitter/callback'
  },
  github: {
    clientID: 'APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: config.host + ':' + config.ipaddr + '/auth/github/callback'
  },
  google: {
    clientID: 'APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: config.host + ':' + config.ipaddr + '/auth/google/callback'
  },
  linkedin: {
    clientID: 'APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: config.host + ':' + config.ipaddr + '/auth/linkedin/callback'
  }
};
