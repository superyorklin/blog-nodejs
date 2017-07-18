var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();  
var fs = require('fs');

module.exports = function(app){
  app.get('/',function(req,res){
    res.render('index', { title: 'Express' });
  });

  /*
  * 管理员访问，上传md文件转换而成的html
  * 文章数据保存入数据库
  **/
  app.post('/admin',multipartMiddleware,function(req,res){
    //console.log(req.body);
    //console.log(req.files);
    var regbody = /<body[^>]*>([\s\S]*)<\/body>/;
    var tmp_path = req.files.file.path;
    var fileContnet = fs.readFileSync(tmp_path,'utf-8');
    var result = regbody.exec(fileContnet);
    if(!result){
      res.send("something wrong")
    }else{
      console.log(result[1]);
      res.send("done");
    }
  });

  /*
  * 获取文章信息
  *
  * */
  app.get('/allArtical',function (req,res) {
    var limit = + req.query.limit;
    var articals = [{
        id: "one",
        title: "react-router学习--york",
        time: "2017-5-20"
    },{
        id: "two",
        title: "TCP协议简介",
        time: "2017-5-21"
    },{
        id: "three",
        title: "rxjs学习笔记",
        time: "2017-5-22"
    },{
        id: "four",
        title: "markdown",
        time: "2017-5-23"
    },{
        id: "five",
        title: "Server-Sent Events 教程",
        time: "2017-5-25"
    },{
        id: "six",
        title: "express总结",
        time: "2017-5-29"
    }];
    if(!limit){
      res.send(articals.slice(0,limit+1));
    }else {
      res.send(articals);
    }
  })
}
