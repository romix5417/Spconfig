var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/:id', function(req, res, next) {
    req.title = "雷达信处控制系统";
    if(req.params.id == "syslog"){
        res.render('syslog', req);
    }else{
        res.render('softlog', req);
    }
});


module.exports = router;