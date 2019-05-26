const express = require('express');

var userRouter = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let User = require('./user.model');

userRouter.route('/add').post(function(req, res){
    
    
    let user = new User(req.body);

    user.password = bcrypt.hashSync(req.body.password, 10);
    //console.log(train);
    user.save()
        .then(user => {
            res.status(200).json({'Train': 'train successfully added'});
        })
        .catch(err => {
            res.status(400).send('unable to save data');
        });
});

userRouter.route('/').get(function(req, res){
    User.find(function(err, user){
        if(err){
            console.log(err);
        }
        else{
            res.json(user);
        }
    });
});

userRouter.route('/login').post(function(req, res){
    let mail = req.body.email;
    let password = req.body.password;
    let pass = bcrypt.hashSync(req.body.password, 10);





    console.log(mail);
    console.log(pass);

    // const user = User.findOne({ email:mail });

    User.findOne({'email':mail})
    .then(function(doc) {
           if(!doc){
                 res.status(400).send("error");
           }else{

                console.log(pass);
                console.log(doc.password);
                if(bcrypt.compareSync(password, doc.password)){
                    console.log("loged in");
                    res.status(200).send(doc);
                }else{
                    console.log("login fail");//else case
                    res.status(400).send("error");
                }
            }
     });
    
});



userRouter.route('/edit/:id').get(function(req, res){
    let id = req.params.id;
    User.findById(id, function(err, user){
        res.json(user);
    });
});

userRouter.route('/update/:id').post(function(req,res){
    User.findById(req.params.id, function(err, user){
        if(!user){
            res.status(404).send("data is not found");
        }
        else{
            train.name = req.body.name;
            train.teleno = req.body.teleno;
            train.address = req.body.address;
            train.email = req.body.email;
            train.job_status = req.body.job_status;
            train.password = req.body.password;


            

            user.save().then(user => {
                res.json('Update Successfully');
            })
            .catch(err => {
                res.status(400).send("unable to update");
            });
        }
    });
});

userRouter.route('/delete/:id').get(function(req, res) {
    User.findByIdAndRemove({_id: req.params.id}, function(err, user){
        if(err){
            res.json(err);
        }
        else{
            res.json('Successfully Deleted');
        }
    });
});
module.exports = userRouter;  