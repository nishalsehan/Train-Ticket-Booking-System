const express = require('express');

var trainRouter = express.Router();

let Train = require('./train.model');

trainRouter.route('/add').post(function(req, res){
    
    var id;
    let train = new Train();
    
    Train.countDocuments(function(err,count){
        if(!count){
            id=1;
            console.log(id);
            train.train_id=1;
            train.name = req.body.name;
            train.from = req.body.from;
            train.to = req.body.to;
            train.time = req.body.time;
            train.fee = req.body.fee;
            
            //console.log(train.id);
            train.save()
                .then(train => {
                    res.status(200).json({'Train': 'train successfully added'});
                })
                .catch(err => {
                    res.status(400).send('unable to save data');
                });
        }else{
            id=count;
            
            
            id=id+1;
            console.log(count+1);
            train.train_id=count+1;
            train.name = req.body.name;
            train.from = req.body.from;
            train.to = req.body.to;
            train.time = req.body.time;
            train.fee = req.body.fee;
            
            //console.log(train.id);
            train.save()
                .then(train => {
                    res.status(200).json({'Train': 'train successfully added'});
                })
                .catch(err => {
                    res.status(400).send('unable to save data');
                });
        }
    });
    
    
});

trainRouter.route('/').get(function(req, res){
    Train.find(function(err, train){
        if(err){
            console.log(err);
        }
        else{
            res.json(train);
        }
    });
});

trainRouter.route('/book').post(function(req, res){

    console.log(req.body.start);
    console.log(req.body.end);

    Train.findOne({'from':req.body.start})
    .then(function(doc){

           if(!doc){
                 res.status(400).send("error");
           }else{
                console.log(doc);
                if(doc.to == req.body.end){

                    res.status(200).send(doc);
                }else{
                    res.status(404).send({message:"No Train"});
                }
            }
     }).catch(err=>{
        
            res.status(404).send({message:"No Train"});
        
     });
});

trainRouter.route('/edit/:id').get(function(req, res){
    let id = req.params.id;
    Train.findById(id, function(err, train){
        res.json(train);
    });
});

trainRouter.route('/update/:id').post(function(req,res){
    Train.findById(req.params.id, function(err, train){
        if(!train){
            res.status(404).send("data is not found");
        }
        else{
            train.name = req.body.name;
            train.from = req.body.from;
            train.to = req.body.to;
            train.time = req.body.time;
            train.fee = req.body.fee;

            

            train.save().then(business => {
                res.json('Update Successfully');
            })
            .catch(err => {
                res.status(400).send("unable to update");
            });
        }
    });
});

trainRouter.route('/delete/:id').get(function(req, res) {
    Train.findOneAndDelete({_id: req.params.id}, function(err, train){
        if(err){
            res.json(err);
        }
        else{
            res.json('Successfully Deleted');
        }
    });
});
module.exports = trainRouter;  