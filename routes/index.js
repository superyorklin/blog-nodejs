var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();  
var fs = require('fs');

module.exports = function(app){
  app.get('/',function(req,res){
    res.render('index', { title: 'Express' });
  });

  app.post('/demo',function(req,res){
    res.setHeader("Access-Control-Allow-Credentials","true");
    res.send(req.cookies);
  })

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
    var page = + req.query.page;
    console.log(page)
    var articals = {
      total: 11,
      data: [{
            id: "one",
            title: "react-router学习--york",
            time: "2017-5-20",
            desc: "<img src='http://yeoman.io/static/illustration-home-inverted.91b07808be.png' />",
            tag: ["react","javascript"],
            visit: 50
        },{
            id: "two",
            title: "TCP协议简介",
            time: "2017-5-21",
            desc: "<p>这是一个描述</p>",
            visit: 50
        },{
            id: "three",
            title: "rxjs学习笔记",
            time: "2017-5-22",
            desc: "<p>这是一个描述</p>",
            visit: 50
        },{
            id: "four",
            title: "markdown",
            time: "2017-5-23",
            desc: "<p>这是一个描述</p>",
            visit: 50
        },{
            id: "five",
            title: "Server-Sent Events 教程",
            time: "2017-5-25",
            desc: "<p>这是一个描述</p>",
            visit: 50
        },{
            id: "six",
            title: "express总结",
            time: "2017-5-29",
            desc: "<p>这是一个6描述</p>",
            visit: 50
        },{
          id: "six",
          title: "express总结",
          time: "2017-5-29",
          desc: "<p>这是一个7描述</p>",
          visit: 50
        },{
          id: "six",
          title: "express总结",
          time: "2017-5-29",
          desc: "<p>这是一个8描述</p>",
          visit: 50
        },{
          id: "six",
          title: "express总结",
          time: "2017-5-29",
          desc: "<p>这是一个9描述</p>",
          visit: 50
        },{
          id: "six",
          title: "express总结",
          time: "2017-5-29",
          desc: "<p>这是一个10描述</p>",
          visit: 50
        },{
          id: "six",
          title: "express总结",
          time: "2017-5-29",
          desc: "<p>这是一个11描述</p>",
          visit: 50
        }]};
    var temp = articals.data.slice((page-1)*10,page*10); 
    articals.data = temp;
    res.send(articals);
  })
    /*
  * 获取归档信息
  *
  * */
  app.get('/archive',function (req,res) {
    var archive = [
      {
        type: "2017年5月",
        data: [
          {
            id: "three",
            title: "rxjs学习笔记",
            time: "2017-5-22",
            desc: "<p>这是一个描述</p>",
            visit: 50
          },{
            id: "six",
            title: "express总结",
            time: "2017-5-29",
            desc: "<p>这是一个11描述</p>",
            visit: 50
          }
        ]
      },
      {
        type: "2017年6月",
        data: [
          {
            id: "three",
            title: "rxjs学习笔记",
            time: "2017-6-22",
            desc: "<p>这是一个描述</p>",
            visit: 50
          },{
            id: "six",
            title: "express总结",
            time: "2017-6-29",
            desc: "<p>这是一个11描述</p>",
            visit: 50
          }
        ]
      }
    ];
    res.send(archive);
  })
}
