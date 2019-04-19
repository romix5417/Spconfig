var express = require('express');
var router = express.Router();
const net = require('net');


/* GET users listing. */
router.get('/', function(req, res, next) {
    req.title = "雷达信处控制系统";
    req.data = {
        "rangbin": "0",
        "prt": "0",
        "azimuth":"0"
    };

    const client = net.createConnection({path:'/tmp/server.sock'}, () => {
        //'connect' listener
        console.log('connected to server');
        client.write("get .hostname");
    });

    client.on('data', (data) => {
        console.log(data.toString());
        client.end();
    });

    client.on('end', () => {
        console.log('disconnected from server.');
    });

    res.render('devconfig', req);
});

router.get('/interboard', function(req, res, next) {
    req.title = "雷达信处控制系统";
    res.render('interboardconf', req);
});

router.get('/adboard', function(req, res, next) {
    req.title = "雷达信处控制系统";
    res.render('adboardconf', req);
});

router.get('/upgrade', function(req, res, next) {
    req.title = "雷达信处控制系统";
    res.render('upgrade', req);
});

router.get('/power', function(req, res, next) {
    req.title = "雷达信处控制系统";
    res.render('power', req);
});

router.post('/upgrade/upload', function(req, res, next) {
    req.title = "雷达信处控制系统";
    res.render('upgrade', req);
});

module.exports = router;