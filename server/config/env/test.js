'use strict';
var privateKeys = require('./private.keys');

module.exports = {
  env: 'test',
  db: { // mongodb options
    uri: 'mongodb://localhost/fullstack-test'
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
