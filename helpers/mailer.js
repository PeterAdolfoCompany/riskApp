const mailer = require('nodemailer');
const hbs = require('hbs');
const fs = require('fs');

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

const generateHtml = (filename, options={}) => {
    const html = hbs.compile(fs.readFileSync((__dirname, `./views/mail/${filename}.hbs`), "utf8"));
    return html(options);
};

exports.send = (options) => {
    const html = generateHtml(options.filename, options);
    const mailOptions = {
        username: options.username,
        subject: options.subject,
        to: options.email,
        from: `${options.from} <noreply@risk-app.com>`,
        text: options.message,
        html
    };

    return transport.sendMail(mailOptions);
};