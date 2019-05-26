const express = require('express');
const nodemailer = require('nodemailer');
var cardRouter = express.Router();
//npm install nodemailer


cardRouter.route('/send').post(function(req, res){
    
    

    let name = req.body.name;
    let email = req.body.email;
    let cardNo = req.body.cardNo;
    let total = req.body.total;

    var output=`<b>Online Train Ticket</b> 
    <p>Dear Sir/Madam ${name}, We recieved your payment of ${total} LKR from ${cardNo}.
Thank you for booking with Online train booking.</p>`;

    let transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            port:25,
    
        auth: {
                user: 'shoppingonlinefood@gmail.com',
                pass: 'shoppingonlinefood123'
        },
        tls:{
                rejectUnauthorized:false
        }
    });


    let mailOptions = {
                from: '"Book your own Train" <trainbooking.org@gmail.com>',
                to: email,
                subject: 'Payment Confirmation',
                text: 'Hello',
                html: output
    };

    transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
                console.log('Email sent: %s', info.messageId);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
     });
   
});


module.exports = cardRouter;  