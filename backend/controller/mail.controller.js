const sgMail = require('@sendgrid/mail');


sgMail.setApiKey('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')

exports.commentMail = (username, email, comment) => {
  sgMail.send({
    to: 'nishanth.mailer@gmail.com',
    from: 'nishanth.mailer@gmail.com',
    subject: 'Tasked Application Comments',
    html: '<h2>Dear Developer</h2><p>' + username + '(' + email + ')' + ' commented on your application.<br/><strong>' + comment + '</strong>',
  })
}
