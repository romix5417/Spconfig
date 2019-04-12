var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    req.title = "雷达信处控制系统";
    req.curTime = new Date();
    res.render('devconfig', req);
});

router.get('/interboard', function(req, res, next) {
    req.title = "雷达信处控制系统";
    req.curTime = new Date();
    res.render('interboardconf', req);
});

router.get('/adboard', function(req, res, next) {
    req.title = "雷达信处控制系统";
    req.curTime = new Date();
    res.render('adboardconf', req);
});

router.get('/upgrade', function(req, res, next) {
    req.title = "雷达信处控制系统";
    req.curTime = new Date();
    res.render('upgrade', req);
});

router.get('/power', function(req, res, next) {
    req.title = "雷达信处控制系统";
    req.curTime = new Date();
    res.render('power', req);
});

router.post('/upgrade/upload', function(req, res, next) {
    req.title = "雷达信处控制系统";
    req.curTime = new Date();
    res.render('upgrade', req);
});

module.exports = router;