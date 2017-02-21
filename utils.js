var fs = require('fs')
var debug = require('debug')('crawler')

exports.mkdir = function(folder){
  var mkdirp = require('mkdirp');
    
  mkdirp('book/' + folder, function (err) {
      if (err) console.error(err)
      else debug('pow!')
  });
}

exports.write_chapter = function(chapter, content){
  // content = content.replace('[笔趣库手机版 m.biquku.com]', '')
  
  fs.writeFile('book/0/330/' + chapter.url, content, function (err) {
    if (err) throw err;
    debug('It\'s saved!');
  });
}

exports.write_config = function(book){
  var content =  JSON.stringify(book, null, 4); // Indented 4 spaces
  fs.writeFile('book/0/330/book.json', content, function (err) {
    if (err) throw err;
    debug('It\'s saved!');
  });
}