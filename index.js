var Crawler = require("crawler");
var cheerio = require('cheerio');
var utils = require('./utils')

var current_book = { }

var c = new Crawler({
    jQuery: 'cheerio',
    maxConnections : 100,
    forceUTF8:true,
  // incomingEncoding: 'gb2312',
    // This will be called for each crawled page
    callback : function (error, result, $) {
      var $=result.$;
      var urls = $('#list a');
      // console.log(urls)
      
      utils.mkdir('0/330');
      
      current_book.title = $('#maininfo h1').text()
      current_book.author = $('#info p').eq(0).text()
      current_book.update_time = $('#info p').eq(2).text()
      current_book.latest_chapter = $('#info p').eq(3).html()
      current_book.intro = $('#intro').html()
      current_book.chapters = [];

      for(var i = 0; i< urls.length; i++){
        var url = urls[i]

        var _url = $(url).attr('href')+"";
        var num = _url.replace('.html','');
        var title = $(url).text();


        current_book.chapters.push({
          num: num,
          title: title,
          url: _url
        })
      }

    //   utils.write_config(current_book);
      // console.log(current_book)
      // 为了演示，模拟一个，不如1k多条，慢死了
    //   var chapter = { num: '4063307', title: '第一千两百五十二章 现世！', url: '4063307.html' }
    //  for(var chapter in current_book.chapters)
    //   one(chapter);
    current_book.chapters.forEach(function(chapter){
      one(chapter);
    })
    
     }

});

function one(chapter){
  c.queue({
    uri: 'http://www.biquku.com/0/330/' + chapter.num + '.html',
    jQuery: 'cheerio',
    forceUTF8:true,
    // The global callback won't be called
    callback: function (error, result, done) {
      if(error){
        console.log(error)
      }
   console.log(chapter.title)
      
      var $=result.$;
      var content = $('#content').html();
      
      utils.write_chapter(chapter, content);
      done();
      // setTimeout(function(){process.exit()},2000);
    }
  });
}

function start(){
  c.queue('http://www.biquku.com/0/330/');
}

start()