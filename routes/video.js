
var express = require('express');
var routes = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/node-android');

routes.get('/',function(req,res) {
  var collection = db.get('videos');
  collection.find({},function(error,response){
    if(error) throw error;
   res.json(response);
  //res.render('video',{user_name:'Nirmal'});
  });
});

module.exports = routes;
