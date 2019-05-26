const express = require('express');

var stationRouter = express.Router();

let Station = require('./station.model');

stationRouter.route('/add').post(function(req, res){
    
    
    let station = new Station();

    Station.countDocuments(function(err,count){
        if(!count){
 
            station.st_id=1;
            station.name = req.body.name;

            station.save()
            .then(station => {
                res.status(200).json({'Train': 'stations successfully added'});
            })
            .catch(err => {
                res.status(400).send('unable to save data');
            });
        }else{

            station.st_id=count+1;
            station.name = req.body.name;
            station.save()
            .then(station => {
                res.status(200).json({'Train': 'stations successfully added'});
            })
            .catch(err => {
                res.status(400).send('unable to save data');
            });
        }
    });
    //console.log(train);
    
});

stationRouter.route('/').get(function(req, res){
    Station.find(function(err, station){
        if(err){
            console.log(err);
        }
        else{
            res.json(station);
        }
    });
});

stationRouter.route('/delete/:id').get(function(req, res) {
    Station.findOneAndDelete({_id: req.params.id}, function(err, train){
        if(err){
            res.json(err);
        }
        else{
            res.json('Successfully Deleted');
        }
    });
});
module.exports = stationRouter;  