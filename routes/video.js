var express = require('express');
var routes = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/node-android');

routes.get('/', function(req, res) {
    console.log('getting videos');
    var collection = db.get('videos');
    collection.find({}, function(error, response) {
        if (error) throw error;
        res.json(response);
        //res.render('video',{user_name:'Nirmal'});
    });
});


routes.post('/', function(req, res) {
    console.log('adding videos');
    var collection = db.get('videos');
    collection.insert({
        title: req.body.title,
        description: req.body.description
    }, function(error, response) {
        if (error) throw error;
        res.json({
            status: "ok",
            code: 200,
            res: response
        });
    });
});

module.exports = routes;
