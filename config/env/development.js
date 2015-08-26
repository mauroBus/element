'use strict';

var privateKeys = require('./private.keys');

module.exports = {
  env: 'development',
  db: { // mongodb options
    uri: 'mongodb://localhost/elementbox-dev',
    // user: '',
    // pass: ''
    options: {
      user: '',
      pass: ''
    }
  },
  mailer: {
    from: privateKeys.mailer.from,
    options: {
      service: privateKeys.mailer.service,
      auth: {
        user: privateKeys.mailer.user,
        pass: privateKeys.mailer.pass
      }
    }
  },
  cloudinaryAccounts: privateKeys.cloudinaryAccounts
};
// 271687969