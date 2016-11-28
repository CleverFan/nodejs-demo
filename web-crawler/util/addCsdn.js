/**
 * Created by chengfan on 2016/11/28.
 */
var request = require('request');
var http = require('http')
var csdnId = require('../config').csdnId;

var ipAndPort = [];

function add(host,port,path) {
    var opt = {
        host:host,
        port:port,
        method:'GET',//这里是发送的方法
        path:path,//这里是访问的路径
        headers:{
            //这里放期望发送出去的请求头
        }
    }

    http.get(opt,function (res) {
        console.log("Got response: " + res.statusCode);
    });
}

module.exports = function () {

    request('http://127.0.0.1:8000/?types=0&count=25&country=%E4%B8%AD%E5%9B%BD', function (error, response, body) {
        if (!error && response.statusCode == 200) {


            ipAndPort = JSON.parse(body);
            try {
                setTimeout(function(){
                    for (test in ipAndPort) {
                        var ip = ipAndPort[test].ip;
                        var port = ipAndPort[test].port;

                        //console.log(port)
                        for (i in csdnId) {
                            add(ip, port, "http://blog.csdn.net/qq_31655965/article/details/" + csdnId[i]);
                        }
                    }
                },50000);

            }catch (err) {

            }
        }
    });


}

