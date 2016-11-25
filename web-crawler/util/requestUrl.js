/**
 * Created by chengfan on 2016/11/23.
 */

var http = require('http');


function getUrl(url,callback) {
    http.get(url, function (res) {
        var html = '';        //用来存储请求网页的整个html内容
        var titles = [];
        res.setEncoding('utf-8'); //防止中文乱码
        //监听data事件，每次取一块数据
        res.on('data', function (chunk) {
            html += chunk;
        });
        //监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
        res.on('end',callback);
    });
}

module.exports = getUrl;