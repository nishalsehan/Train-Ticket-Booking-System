const mongoose = require('mongoose');

const creditPaymentSchema = mongoose.Schema({

    ticket_id: { 
        type: String,
        required: true 
    },
    userMail:{ 
        type: String,
         required: true  
    },
    amount: { 
        type: Number,
         required: true  
    },
    discount: { 
        type: Number,
         required: true  
    },
    total: { 
        type: Number, 
        required: true  
    },
    cardName: { 
        type: String, 
        required: true  
    },
    cardNumber: { 
        type: String, 
        required: true  
    }
    
});

module.exports = mongoose.model('CreditPayment', creditPaymentSchema);