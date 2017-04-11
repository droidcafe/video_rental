var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Vidzy',
        user_name: 'Nirmal Kumar'
    });
});

module.exports = router;
