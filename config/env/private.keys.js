'use strict';

module.exports = {

  cloudinaryAccounts: [{ // mauro buselli
    cloud_name: 'dlna4ig9a',
    api_key: '866942968572717',
    api_secret: 'sDKh26phZ7-xtHPQhsMLbbs3zNE'
  }, { // box labs
    cloud_name: 'djsgyfuly',
    api_key: '438921194743693',
    api_secret: 'CwIFv6X5Um9Ls3lF1XotvnkYfE4'
  }],

  mailer: {
    from: process.env.MAILER_FROM || 'boxlabs_studios@yahoo.com',// 'boxlabs.studios@gmail.com',
    service: process.env.MAILER_SERVICE_PROVIDER || 'Yahoo',
    user: process.env.MAILER_EMAIL_ID || 'boxlabs_studios@yahoo.com',
    pass: process.env.MAILER_PASSWORD || 'labbox00'
  }
};
