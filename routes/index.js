var express = require('express');
var router = express.Router();
const net = require('net');


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
        "mainboard_system_os":"",
        "mainboard_system_kernel":"",
        "mainboard_system_uptime":"",
        "mainboard_memory_total":"",
        "mainboard_memory_used":"",
        "mainboard_memory_free":""
    };

    const client = net.createConnection({path:'/tmp/server.sock'}, () => {
        //'connect' listener
        console.log('connected to server');
        client.write("get .");
    });

    client.on('data', (data) => {
        console.log(data.toString());
        data = JSON.parse(data);

        req.data.name = data.name;
        req.data.firmware = data.firmware;
        req.data.hostname = data.hostname;
        req.data.mainboard_cpu_arch = data.mainboard.cpu.arch;
        req.data.mainboard_cpu_info = data.mainboard.cpu.info;
        req.data.mainboard_system_os = data.mainboard.system.os;
        req.data.mainboard_system_kernel = data.mainboard.system.kernel_ver;
        req.data.mainboard_system_uptime = data.mainboard.system.uptime;
        req.data.mainboard_memory_total = data.mainboard.memory.total;
        req.data.mainboard_memory_used = data.mainboard.memory.used;
        req.data.mainboard_memory_free = data.mainboard.memory.free;

        console.log(req.data.mainboard_cpu_arch);

        res.render('index', req);
        client.end();
    });

    client.on('end', () => {
        console.log('disconnected from server.');
    });


});

module.exports = router;
