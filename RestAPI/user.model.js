const mongoose = require('mongoose');

var user
 = new mongoose.Schema({
        
        name:{
            type: String
        },
        teleno:{
            type: Number
        },
        email:{
            type: String
        },
        job_status:{
            type: String
        },
        nic:{
            type: String
        },
        password:{
            type: String
        }

        
});

module.exports = mongoose.model('User', user)