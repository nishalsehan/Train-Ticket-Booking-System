const mongoose = require('mongoose');

const mobilePaymentSchema = mongoose.Schema({

    ticketId: { 
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
    mobileNo: { 
        type: String, 
        required: true  
    }
});

module.exports = mongoose.model('MobilePayment', mobilePaymentSchema);