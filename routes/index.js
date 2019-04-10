var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  req.title = "雷达信处控制系统";
  req.curTime = new Date();
  res.render('index', req);
});

module.exports = router;
