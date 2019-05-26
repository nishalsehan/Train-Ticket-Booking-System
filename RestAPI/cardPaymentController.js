const express = require('express');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

var CardRouter = express.Router();

let Card = require('./cardPayment.Model');

CardRouter.route('/add').post(function(req, res){
    
    
    let card = new Card(req.body);

    //console.log(train);
    card.save()
        .then(user => {
            var output=`<b>Online Train Ticket</b> 
                <p>Dear Sir/Madam ${req.body.cardName}, <br> We recieved your payment of ${req.body.total} LKR from ${req.body.cardNumber}.
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
                res.status(200).send({message:"Successfully added",body:user});
        })
        .catch(err => {
            res.status(400).send('unable to save data');
        });
});

CardRouter.route('/').get(function(req, res){
    Card.find(function(err, user){
        if(err){
            console.log(err);
        }
        else{
            res.json(user);
        }
    });
});


module.exports = CardRouter;  