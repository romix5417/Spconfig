var express = require('express');
var router = express.Router();
const net = require('net');

function get_radargsp_info(req, res, next) {
    req.title = "雷达信处控制系统";
    req.data = {
        "radargsp_radar_rffreq": "0",
        "radargsp_radar_rangebin": "0",
        "radargsp_radar_prtnum":"0",
        "radargsp_radar_rchanel":"0",
        "radargsp_radar_azimuth":"0",
        "radargsp_count_ksnrzdb":"0",
        "radargsp_count_ksnrvdb":"0",
        "radargsp_count_windows":"0",
        "radargsp_count_radarconst":"0",
        "radargsp_running_cache":"0",
        "radargsp_running_threadpool":"0",
        "radargsp_running_clutter_filter":"0"
    };

    const client = net.createConnection({path:'/tmp/server.sock'}, () => {
        //'connect' listener
        console.log('connected to server');
        client.write("get .radargsp");
    });

    client.on('data', (data) => {
        data = JSON.parse(data);

        req.data.radargsp_radar_rffreq = data.radar.rffreq;
        req.data.radargsp_radar_rangebin = data.radar.rangebin;
        req.data.radargsp_radar_prtnum = data.radar.prtnum;
        req.data.radargsp_radar_rchannel = data.radar.rchannel;
        req.data.radargsp_radar_azimuth = data.radar.azimuth;
        req.data.radargsp_count_ksnrzdb = data.count.ksnrzdb;
        req.data.radargsp_count_ksnrvdb = data.count.ksnrvdb;
        req.data.radargsp_count_windows = data.count.windows;
        req.data.radargsp_count_radarconst = data.count.radarconst;
        req.data.radargsp_running_cache = data.running.cache;
        req.data.radargsp_running_threadpool = data.running.threadpool;
        req.data.radargsp_running_clutter_filter = data.running.clutter_filter;

        res.render('devconfig', req);
        client.end();
    });

    client.setTimeout(100, function () {
        console.log('客户端在' + 100 + 'ms内未通信，将断开连接...');
    });

    client.on('end', () => {
        console.log('disconnected from server.');
    });
}

function post_radargsp_info(req, res, path, postdata) {
    const client = net.createConnection({path:'/tmp/server.sock'}, () => {
        //'connect' listener
        console.log('connected to server');
        var cmd = "set \'";

        for (var i = 0; i < path.length; i++) {
            cmd += path[i] + "=" + "\"" + postdata[i] + "\"";
            if (i < (path.length - 1)) {
                cmd += " | "
            }
        }

        cmd += "\'";
        client.write(cmd);
    });

    client.setTimeout(100, function () {
        console.log('客户端在' + 100 + 'ms内未通信，将断开连接...');
    });

    client.on('data', (data) => {
        client.end();
    });

    client.on('end', () => {
        console.log('disconnected from server.');
    });
}

/* GET users listing. */
router.get('/', function(req, res, next) {
    get_radargsp_info(req,res, next);
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

router.get('/basesetpost', function (req, res, next) {
    get_radargsp_info(req, res, next);
});

router.post('/basesetpost', function (req, res, next) {

    var path = [
        ".radargsp.radar.rffreq",
        ".radargsp.radar.rangebin",
        ".radargsp.radar.prtnum",
        ".radargsp.radar.rchannel",
        ".radargsp.radar.azimuth"
    ];

    var postdata = [];
    console.log(req.body.rangbin);
    postdata[0] = req.body.rffreq;
    postdata[1] = req.body.rangebin;
    postdata[2] = req.body.prtnum;
    postdata[3] = req.body.rchannel;
    postdata[4] = req.body.azimuth;

    post_radargsp_info(req, res, path, postdata);
    get_radargsp_info(req, res, next);
});

router.get('/countpost', function (req, res, next) {
    get_radargsp_info(req, res, next);
});

router.post('/countpost', function (req, res, next) {

    var path = [
        ".radargsp.count.cache",
        ".radargsp.count.threadpool",
        ".radargsp.count.clutter_filter"
    ];

    var postdata = [];
    console.log(req.body.cache);
    postdata[0] = req.body.ksnrzdb;
    postdata[1] = req.body.ksnrvdb;
    postdata[2] = req.body.windows;
    postdata[3] = req.body.radarconst;

    post_radargsp_info(req, res, path, postdata);
    get_radargsp_info(req, res, next);
});

router.get('/runningpost', function (req, res, next) {
    get_radargsp_info(req, res, next);
});

router.post('/runningpost', function (req, res, next) {

    var path = [
        ".radargsp.running.cache",
        ".radargsp.running.threadpool",
        ".radargsp.running.clutter_filter"
    ];

    var postdata = [];
    console.log(req.body.cache);
    postdata[0] = req.body.cache;
    postdata[1] = req.body.threadpool;
    postdata[2] = req.body.clutter_filter;

    post_radargsp_info(req, res, path, postdata);
    get_radargsp_info(req, res, next);
});



module.exports = router;