
var API_KEY = process.env.MailGunApiKey || ''
var DOMAIN = process.env.mailDomain;
var mailgun = require('mailgun-js')({
    apiKey: API_KEY,
    domain: DOMAIN,
    host: "api.eu.mailgun.net",
});


export const sendMail = (code, email) => {
    const data = {
        from: '<thEplatform@samples.mailgun.org>',
        to: email,
        subject: 'reset password code',
        text: code,
        html: `<b> this is the code: ${code}</b>`
    };

    mailgun.messages().send(data, (error, body) => {
        if (error) {
            console.log(error)
        } else {
            console.log(body);

        }
    });
}
