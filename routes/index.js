var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
            res.render('homepage',
            {
                page_title: "Project Management System"
            });
        
    });
module.exports = router;