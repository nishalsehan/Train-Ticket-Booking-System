const express = require('express');

var ticketRouter = express.Router();

let Ticket = require('./tickets.model');
let Train = require('./train.model');
let User = require('./user.model');



ticketRouter.route('/add').post(function(req, res){
    
    
    let ticket = new Ticket(req.body);
    console.log(req.body.name);

    

    
    
    ticket.save()
        .then(ticket => {
            res.status(200).json({'Ticket': 'ticket successfully added'});
        })
        .catch(err => {
            res.status(400).send('unable to save data');
        });
});

ticketRouter.route('/').get(function(req, res){
    Ticket.find(function(err, tickets){
        if(err){
            console.log(err);
        }
        else{
            res.json(tickets);
        }
    });
});


module.exports = ticketRouter;  