'use strict';

module.exports = {
  env: 'development',
  db: { // mongodb options
    uri: 'mongodb://localhost/elementbox-dev'
  },
  mailer: {
    from: process.env.MAILER_FROM || 'MAILER_FROM',
    options: {
      // service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
      service: process.env.MAILER_SERVICE_PROVIDER || 'Yahoo',
      auth: {
        // user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
        user: process.env.MAILER_EMAIL_ID || 'smtp.mail.yahoo.com',
        pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
      }
    }
  }

};
