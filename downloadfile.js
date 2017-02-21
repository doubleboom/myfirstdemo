//依赖模块
var fs = require('fs');
var request = require("request");
var cheerio = require("cheerio");
var mkdirp = require('mkdirp');

//目标网址
var url = 'http://image.so.com/zj?ch=beauty&sn=0&listtype=new';
var startNum = 0;

//本地存储目录
var dir = './images';

//创建目录
mkdirp(dir, function (err) {
    if (err) {
        console.log(err);
    }
});

//发送请求
setInterval(function () {
    url = 'http://image.so.com/zj?ch=beauty&sn=' + startNum * 30 + '&listtype=new'
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // var $ = cheerio.load(body);
            var data = JSON.parse(body);
            for (var i = 0, len = data.list.length; i < len; i++) {
                var src = data.list[i].qhimg_url;
                console.log('正在下载' + src);
                var title = data.list[i].group_title.replace(/[\'\"\\\/\b\f\n\r\t]/g, '');
                download(src, dir, title.replace(/[\@\#\$\%\^\&\*\(\)\{\}\:\"\L\<\>\?\[\]]/));
                console.log('下载完成');
            };
            if (data.list.length != 30) {
                clearInterval();
            }
        }
    });
    startNum++;
}, 2000);


//下载方法
var download = function (url, dir, filename, callback) {
    request.head(url, function (err, res, body) {
        request(url).on('error', function (err) {
            console.log(err)
        }).pipe(fs.createWriteStream(dir + "/" + filename + '.jpg'));
    });
};