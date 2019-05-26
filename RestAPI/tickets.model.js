const mongoose = require('mongoose');

var ticket = new mongoose.Schema({
        ticket_id:{
            type: String
        },
        train_id:{
            type: String
        },
        payment_id:{
            type: String
        },
        name:{
            type: String
        },
        from:{
            type: String
        },
        to:{
            type: String
        },
        time:{
            type: String
        },
        fee:{
            type: Number
        },
        payment_method:{
            type: String
        },
        ticket_count:{
            type: Number
        },
        date:{
            type: Date
        }

        
});

module.exports = mongoose.model('Ticket',ticket);
