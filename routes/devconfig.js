var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    req.title = "雷达信处控制系统";
    req.curTime = new Date();
    res.render('devconfig', req);
});

module.exports = router;