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

routes.get('/:id', function(req, res) {
    console.log('getting video details for ' + req.params.id);
    var collection = db.get('videos');
    collection.findOne({
        _id: req.params.id
    }, function(error, response) {
        if (error) throw error;
        res.json(response);
    });

});



routes.put('/:id', function(req, res) {
    console.log('updating video');
    var collection = db.get('videos');
    collection.update({
        _id: req.params.id
    }, {
        title: req.body.title,
        description: req.body.description
    }, function(err, video) {
        if (err) throw err;
        res.json(video);
    });
});

routes.delete('/:id', function(req, res) {
    var collection = db.get('videos');
    collection.remove({
        _id: req.params.id
    }, function(err) {
        if (err) throw err;
        res.json({
            status: "OK",
            delete: "istrue"
        });
    });
});

module.exports = routes;
