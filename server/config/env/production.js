'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + '/../../public');

module.exports = {
  root: rootPath,
  env: 'production',
  db: { // mongodb options
    uri: process.env.OPENSHIFT_MONGODB_DB_URL
    // options: {
    //   user: process.env.OPENSHIFT_MONGODB_DB_USERNAME
    //   pass: process.env.OPENSHIFT_MONGODB_DB_PASSWORD
    // }
  },
  mailer: {
    from: process.env.MAILER_FROM || 'MAILER_FROM',
    options: {
      service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
      auth: {
        user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
        pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
      }
    }
  }
};
