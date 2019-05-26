const mongoose = require('mongoose');

var train = new mongoose.Schema({
        
        train_id:{
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
        route:{
            type: Array
        },
        fee:{
            type: Number
        }
});

module.exports = mongoose.model('Train', train)