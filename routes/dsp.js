var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    req.title = "雷达信处控制系统";
    res.render('dsp', req);
});

router.get('/interboard', function(req, res, next) {
    req.title = "雷达信处控制系统";
    res.render('interboard', req);
});

router.get('/adboard', function(req, res, next) {
    req.title = "雷达信处控制系统";
    console.log("id = %s", req.params.id);
    res.render('adboard', req);
});

router.get('/adboard/:id', function(req, res, next) {
    req.title = "雷达信处控制系统";
    res.render('adboard', req);
});

module.exports = router;