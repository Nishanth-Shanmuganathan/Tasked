const sgMail = require('@sendgrid/mail');

const { API_KEY } = require('./../env')

sgMail.setApiKey(API_KEY)

exports.commentMail = (username, email, comment) => {
  sgMail.send({
    to: 'nishanth.mailer@gmail.com',
    from: 'nishanth.mailer@gmail.com',
    subject: 'Tasked Application Comments',
    html: '<h2>Dear Developer</h2><p>' + username + '(' + email + ')' + ' commented on your application.<br/><strong>' + comment + '</strong>',
  })
}
