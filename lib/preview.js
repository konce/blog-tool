var express = require('express');
var static = require('serve-static');
var path = require('path');
var fs = require('fs');
var MD = require('markdown-it');
var md = new MD({
  html: true,
  langPrefix: 'code-'
});

module.exports = function (dir) {
  dir = dir || '.';
  var app = express(),
    router = express.Router();

  app.use('/statics', static(path.resolve(dir, 'statics')));

  app.use(router);

  router.get('/posts/*', function (req, res, next) {
    var name = stripExt(req.params[0])
    var file = path.resolve(dir, '_posts', name + '.md');
    fs.readFile(file, function (err, contents) {
      if (err) return next(err)

      var html = mdToHTML(contents.toString());
      res.end(html)
    });
  });

  router.get('/', function (req, res, next) {
    res.end('文章列表');
  });

  app.listen(3000);
}

function stripExt (name) {
  var i = 0 - path.extname(name).length;
  if (i === 0) i = name.length;
  return name.slice(0, i);
}

function mdToHTML (content) {
  return md.render(content || '')
}
