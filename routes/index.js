var express = require('express');
var router = express.Router();
const net = require('net');
const os = require('os');


/* GET home page. */
router.get('/', function(req, res, next) {
    req.title = "雷达信处控制系统";
    req.curTime = new Date();
    req.data = {
        "name": "",
        "firmware": "",
        "hostname": "",
        "mainboard_cpu_arch":"",
        "mainboard_cpu_info":"",
        "mainboard_cpu_threadx":"",
        "mainboard_system_os":"",
        "mainboard_system_kernel":"",
        "mainboard_system_uptime":"",
        "mainboard_memory_total":"",
        "mainboard_memory_used":"",
        "mainboard_memory_free":"",
        "mainboard_memory_cache":"",
        "average_load":""
    };

    const client = net.createConnection({path:'/tmp/server.sock'}, () => {
        //'connect' listener
        console.log('connected to server');
        client.write("get .");
    });

    client.on('data', (data) => {
        //console.log(data.toString());
        data = JSON.parse(data);

        req.data.name = data.name;
        req.data.firmware = data.firmware;
        req.data.hostname = data.hostname;
        req.data.mainboard_cpu_arch = data.mainboard.cpu.arch;
        req.data.mainboard_cpu_info = data.mainboard.cpu.info;
        req.data.mainboard_cpu_threadx = data.mainboard.cpu.threadx;
        req.data.mainboard_system_os = data.mainboard.system.os;
        req.data.mainboard_system_kernel = data.mainboard.system.kernel_ver;
        req.data.mainboard_system_uptime = data.mainboard.system.uptime;
        req.data.mainboard_memory_total = data.mainboard.memory.total;
        req.data.mainboard_memory_used = data.mainboard.memory.used;
        req.data.mainboard_memory_free = data.mainboard.memory.free;
        req.data.mainboard_memory_cache = data.mainboard.memory.cache;

        var load_avg = os.loadavg();
        load_avg[0] = load_avg[0].toFixed(2);
        load_avg[1] = load_avg[1].toFixed(2);
        load_avg[2] = load_avg[2].toFixed(2);
        req.data.average_load = "" + load_avg;

        res.render('index', req);
        client.end();
    });

    client.on('end', () => {
        console.log('disconnected from server.');
    });


});

module.exports = router;
