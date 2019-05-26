const mongoose = require('mongoose');

var station = new mongoose.Schema({
        st_id:{
            type: String
        },
        name:{
            type: String
        }

        
});
module.exports = mongoose.model('Station',station);
