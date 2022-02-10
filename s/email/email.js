var nodemailer = require('nodemailer');

const objeto = {};

objeto.enviar = function(req, res) {
    const { mensaje } = req.body;
    /* Nodemailer configuration
    --------------------------------------------------------------------------------*/
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'ben.jacobi11@ethereal.email',
            pass: 'QATGPcs1Cyt4r53PAN'
        }
    });
    var mailOptions = {
        from: 'ben.jacobi11@ethereal.email',
        to: 'neury.developer@gmail.com',
        subject: 'Sending Email using Node.js',
        // plaintext body
        text: 'Hello to myself!',

        // HTML body
        html: mensaje

    };

    /* Nodemailer configuration
    --------------------------------------------------------------------------------*/
    //var transporter = nodemailer.createTransport({
    //    service: 'gmail',
    //    auth: {
    //        user: 'neury.developer@gmail.com',
    //        pass: 'yczzhdzsvjqtsiky'
    //    }
    //});
    //
    //var mailOptions = {
    //    from: 'neury.developer@gmail.com',
    //    to: 'eleasar0991@gmail.com',
    //    subject: 'Sending Email using Node.js',
    //    text: 'That was easy!',
    //    // HTML body
    //    html: `<h1>Welcome</h1>
    //        <p>That was easy!</p>
    //        <p style="color: red">That was easy!</p>
    //        <p style="font-style: italic;">That was easy!</p>
    //        <p style="text-decoration-line: overline underline;text-decoration-style: wavy;">That was easy!</p>`
    //};

    /* Envio a multiples correos
    --------------------------------------------------------------------------------*/
    //var mailOptions = {
    //  from: 'youremail@gmail.com',
    //  to: 'myfriend@yahoo.com, myotherfriend@yahoo.com',
    //  subject: 'Sending Email using Node.js',
    //  text: 'That was easy!'
    //}

    /* Envio en formato HTML
    --------------------------------------------------------------------------------*/
    //var mailOptions = {
    //  from: 'youremail@gmail.com',
    //  to: 'myfriend@yahoo.com',
    //  subject: 'Sending Email using Node.js',
    //  html: '<h1>Welcome</h1><p>That was easy!</p>'
    //} 
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.setHeader('Content-type', 'text/plain');
            res.send('Email enviado.');
        }
    });
};

module.exports = objeto;