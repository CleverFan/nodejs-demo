/**
 * Created by chengfan on 2016/11/23.
 */
var cheerio = require('cheerio');
//var url = require('../config').fetchUrl;


var http = require('http');


function getIp() {

    var html = '';        //用来存储请求网页的整个html内容
    var titles = [];

    var opt = {
        method:'GET',//这里是发送的方法
        url:'http://www.baidu.com',     //这里是访问的路径
        // headers:{
        //     //这里放期望发送出去的请求头
        //     Accept:'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        //     'Accept-Encoding':'gzip, deflate, sdch',
        //     'Accept-Language':'zh-CN,zh;q=0.8,en;q=0.6',
        //     'Cache-Control':'max-age=0',
        //     'Connection':'keep-alive',
        //     Referer:'http://www.xicidaili.com/',
        //     'Upgrade-Insecure-Requests':1,
        //     'User-Agent':'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.76 Mobile Safari/537.36'
        //
        // }
    }
    //res.setEncoding('utf-8'); //防止中文乱码
    //res.setRequestHeader(header);
    //监听data事件，每次取一块数据

    var req = http.get('http://www.kuaidaili.com/free', function(res) {
        res.setEncoding('utf-8');
        console.log("Got response: " + res.statusCode);
        res.on('data',function(d){
            html += d;
        }).on('end', function(){
            var $ = cheerio.load(html); //采用cheerio模块解析html
            $(".table").find("tbody").find("tr").each(function(){
                var tdArr = $(this).children().children();
                var ip = tdArr;//收入类别
                //var poot = tdArr;//收入金额

                console.log(ip)
                //console.log(poot)


            });
           // console.log(html);
        }).on('error', function(e) {
            console.log("Got error: " + e.message);
        });


    });

    req.end();

}

module.exports = getIp;

