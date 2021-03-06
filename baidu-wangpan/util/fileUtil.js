/**
 * Created by chengfan on 2016/11/20.
 */
var fs = require('fs')

//遍历文件夹，获取所有文件夹里面的文件信息
/*
 * @param path 路径
 *
 */
function getFileList(path)
{
    var filesList = [];
    readFile(path,filesList);
    return filesList;
}

//遍历读取文件
function readFile(path,filesList)
{
    files = fs.readdirSync(path);//需要用到同步读取
    files.forEach(walk);
    function walk(file)
    {
        states = fs.statSync(path+'/'+file);
        if(states.isDirectory())
        {
            readFile(path+'/'+file,filesList);
        }
        else
        {
            //创建一个对象保存信息
            var obj = new Object();
            obj.size = states.size;//文件大小，以字节为单位
            obj.name = file;//文件名
            obj.path = path+'/'+file; //文件绝对路径
            filesList.push(obj);
        }
    }
}

//写入文件utf-8格式
// function writeFile(fileName,data)
// {
//     fs.writeFile(fileName,data,'utf-8',complete);
//     function complete()
//     {
//         console.log("文件生成成功");
//     }
// }




function sortHandler(a,b)
{
    if(a.size > b.size)
        return -1;
    else if(a.size < b.size) return 1
    return 0;
}


module.exports = function (path) {
    var filesList = getFileList(path);
    filesList.sort(sortHandler);
    var str='';
    for(var i=0;i<filesList.length;i++) {
        var item = filesList[i];
        var desc ="文件名:"+item.name + " "
            +"大小:"+(item.size/1024).toFixed(2) +"/kb"+" "
            +"路径:"+item.path;
        str+=desc +"\n"
    }
    console.log(str)
    return str;
}

//writeFile("test.txt",str);