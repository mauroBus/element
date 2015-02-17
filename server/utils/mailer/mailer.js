
var nodemailer = require('nodemailer'),
    config = require('../../config/config'),
    fs = require('fs'),
    _ = require('lodash');

var smtpTransport = nodemailer.createTransport(config.mailer.options);

module.exports = {
  /**
   * @param {Object} options:
   *  @param {String} options.to          email destinatary.
   *  @param {String} options.subject     subject of email.
   *  @param {String} options.templateUrl html template path to build the email.
   *  @param {String} options.tplData     data to parse the template url.
   *  @param {String} options.cb          final cb. First param: err.
   */
  sendMail: function(options) {
    fs.readFile(options.templateUrl, function(err, emailTpl) {
      if (err) {
        options.cb(new Error('Could not find the template url.'));
      } else {
        var tpl = _.template(emailTpl)(options.tplData);

        var mailOptions = {
          to: options.to,
          from: config.mailer.from,
          subject: options.subject,
          html: emailTpl
        };

        smtpTransport.sendMail(mailOptions, options.cb);
      }
    });
  }

};
