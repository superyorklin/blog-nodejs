var markdown = require('markdown').markdown;
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();  
var fs = require('fs');

module.exports = function(app){
  app.get('/',function(req,res){
    res.render('index', { title: 'Express' });
  });
  app.post('/admin',multipartMiddleware,function(req,res){
    console.log(req.body);
    console.log(req.files);
    var tmp_path = req.files.file.path;
    var fileContnet = fs.readFileSync(tmp_path,'utf-8');
    fileContnet = markdown.toHTML(fileContnet);
    res.send(fileContnet);
  })
}
