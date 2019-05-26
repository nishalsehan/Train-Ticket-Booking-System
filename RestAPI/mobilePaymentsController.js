const express = require('express');
const nodemailer = require('nodemailer');
var mobileRouter = express.Router();
const smtpTransport = require('nodemailer-smtp-transport');

let Mobile = require('./mobilePayment.model');

mobileRouter.route('/add').post(function(req, res){
    
    
    let mobile = new Mobile(req.body);

    
    mobile.save()
        .then(mobile => {
            console.log(req.body);
            var output=`<b>Online Train Ticket</b> 
                <p>Dear Sir/Madam ${req.body.cardName}, <br> We recieved your payment of ${req.body.total} LKR from ${req.body.mobileNo}.
            Thank you for booking with Online train booking.</p>`;
            let transporter = nodemailer.createTransport(smtpTransport({
                service: 'Gmail',
                auth: {
                    user: 'dsonlinetrainbooking@gmail.com',
                    pass: 'it17089050'
                },
                tls: {
                    rejectUnauthorized: false
                }
            }));
            let mailOptions = {
                from: '"Book your own Train" <trainbooking.org@gmail.com>',
                to: req.body.userMail,
                subject: 'Payment Confirmation',
                text: "",
                html:output
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err);
                } else
                    console.log('Email sent to : ' + req.body.userEmail);
            });
            res.status(200).json({'Payment': 'payment successfully added'});
        })
        .catch(err => {
            res.status(400).send('unable to save data');
        });
});

mobileRouter.route('/').get(function(req, res){
    Card.find(function(err, user){
        if(err){
            console.log(err);
        }
        else{
            res.json(user);
        }
    });
});


module.exports = mobileRouter;  