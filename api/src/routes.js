let read_yaml = require('read-yaml');
let nodemailer = require('nodemailer');
let Base64 = require('js-base64').Base64;

function send_mail(req, res) {
    if (!req.body.address) {
        res.status(400).send({ "error": "Wrong request" });
    }

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ducmailerservice@gmail.com',
            pass: 'ducaturmailer1'
        }
    });

    console.log(Base64.encode(req.body));

    const mailOptions = {
        from: 'ducmailerservice@gmail.com', // sender address
        to: req.body.emailTo, // list of receivers
        subject: `You have new sponsorship request!`, // Subject line
        html: `<a href="http://127.0.0.1:3005/?data=${Base64.encode(JSON.stringify(req.body))}">
            Here is your link for sponsorship answer
        </a> for ${req.body.address} of ${req.body.amount} ${req.body.currency}`
    };

    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log(err)
            res.send({ 'status': 'error' });
        } else {
            console.log(info)
            res.send({ 'status': 'OK' });
        }
    });

}

module.exports = function routes(app) {
    app.post('/send_mail', send_mail);
}