const mailer = require('nodemailer');

const transport = mailer.createTransport({
    service: 'SendGrid',
    auth: {
        user: process.env.SEND_USER,
        pass: process.env.SEND_PASS
    }
});

transport.verify(function(error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take our messages');
    }
});

exports.send = (options) => {
    const mailOptions = {
        subject: options.subject,
        to: options.email,
        from: `${options.from} <noreply@risk-app.com>`,
        text: options.message,
        html: `<h1>${options.message}</h1>`
    };

    return transport.sendMail(mailOptions);
};