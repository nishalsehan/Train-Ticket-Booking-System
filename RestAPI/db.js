const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/train-booking',{
    useNewUrlParser: true},(err) =>{
        if(!err){
            console.log('Mongodb Connection Suceeded')
        }else{
            console.log('Error in db connection' + err)
        }
    }
);