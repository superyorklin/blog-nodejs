var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();  
var fs = require('fs');
var path = require('path');
var uuid = require('uuid/v4');
var Artical = require('../model/Artical');
var Comment = require('../model/Comment');
var Recommend = require('../model/Recommend');
var co = require('co');
var _ = require('lodash');
var transporter = require('../Util/email');
var svgCaptcha = require('svg-captcha');
require('../Util/time-format');

module.exports = function(app){
 /* app.get('/',function(req,res){
    res.render('index', { title: 'Express' });
  });*/
  app.get('/captcha',function(req,res) {
    let captcha = svgCaptcha.create({
      size: 4,
      noise: 2,
      color: true,
      width: 80,
      height: 30,
      background: '#eee',
      fontSize: 30
    });
    req.session.code = captcha.text;
    console.log(captcha.text);
    res.type('svg');
    res.status(200).send(captcha.data);
  });

  
  app.post('/login',function(req,res){
    var userName = req.query.userName;
    var password = req.query.password;
    if(userName=='admin'&&password=='admin'){
      res.cookie('lyz_blog','admin',{maxAge: 3600000});
      res.send({login: true})
    }else{
      res.send({login: false})
    }
  })
  app.post('/upload',multipartMiddleware,function(req,res){
    var tmp_path = req.files.logo.path;
    var regbody = /<body[^>]*>([\s\S]*?)<\/body>/;
    var fileContnet = fs.readFileSync(tmp_path,'utf-8');
    fs.unlink(tmp_path);
    var result =regbody.exec(fileContnet)
    if(!result){
      res.send({err: "something wrong"})
    }else{
      fs.writeFileSync(path.join(__dirname,'../public/content.html'),result[1]);
      res.send({success: "done"});
    }
  })
  /*
  * 管理员访问，上传md文件转换而成的html
  * 文章数据保存入数据库
  **/
  app.post('/admin',function(req,res){
    var content = fs.readFileSync(path.join(__dirname,'../public/content.html'),'utf-8');
    fs.unlink(path.join(__dirname,'../public/content.html'));
    var artical = new Artical({
      articalId: uuid(),
      title: req.query.articalTitle,
      time: new Date().getTime(),
      desc: req.query.articalDesc,
      tag: req.query.articalType.split(" "),
      visit: 0,
      comment: 0,
      content: content
    });
    artical.save(function(err,data){
      if(err){
        res.status(403).end();
      }else{
        res.send({Success: true})
      }
    })
  });
  /*
  * 管理员访问，添加推荐文章
  * 文章数据保存入数据库
  **/
  app.post('/recommend',function(req,res){
    var recommend = new Recommend({
      author: req.query.articalAuthor,
      title: req.query.articalTitle,
      url: req.query.articalUrl,
      tag: req.query.articalType.split(" "),
      desc: req.query.articalDesc
    });
    recommend.save(function(err,data){
      if(err){
        res.status(403).end()
      }else{
        res.send({Success: true})
      }
    })
  });

  app.post('/deleteArtical',function(req,res){
    var articalId = req.query.articalId;
    co(function*(){
      try {
        yield Artical.remove({articalId: articalId});
        yield Comment.remove({articalId: articalId});
        res.send({Success: true})
      } catch (error) {
        res.status(403);
        res.send({err: error})
      }
    })
  })

  app.post('/deleteComment',function(req,res){
    var commentId = req.query.commentId;
    co(function*(){
      try {
        yield Comment.remove({commentId: commentId});
        res.send({Success: true})
      } catch (error) {
        res.status(403);
        res.send({err: error})
      }
    })
  })

  /*
  * 获取文章信息
  *
  * */
  app.get('/allArtical',function (req,res) {
    var page = + req.query.page-1;
    co(function*(){
      var count = yield Artical.count({}).exec();
      var articals = yield Artical.find({}).sort({_id: -1}).skip(page*10).limit(10);
      var response = {};
      response.data = [];
      response.total = count;
      articals.forEach(function(artical) {
        response.data.push(_.omit(artical,'content'))
      });
      res.send(response);
    })
    
  })
  /*
  * 获取归档信息
  *
  * */
  app.get('/archive',function (req,res) {

    co(function*(){
      var articals = yield Artical.find({}).sort('time');
      let archive = [];
      let typeArr = [];
      articals.forEach(function(artical){
        let time = new Date(artical.time);
        let date = time.getFullYear().toString() +'年'+ (time.getMonth()+1).toString() + '月';
        if(_.indexOf(typeArr,date) == -1){
          typeArr.push(date);
          archive.push({
            type: date,
            data: [
              {
                id: artical.articalId,
                title: artical.title,
                time: artical.time,
                desc: artical.desc,
                visit: artical.visit,
                tag: artical.tag
              }
            ]
          })
        }else{
          let index = _.indexOf(typeArr,date);
          archive[index].data.push({
            id: artical.articalId,
            title: artical.title,
            time: artical.time,
            desc: artical.desc,
            visit: artical.visit,
            tag: artical.tag
          })
        }
      })
      res.send(archive);
    })
  })
  /*
  * 获取推荐信息
  *
  * */
  app.get('/recommend',function (req,res) {
    var page = + req.query.page-1;
    co(function*(){
      var count = yield Recommend.count({}).exec();
      var articals = yield Recommend.find({}).skip(page*5).limit(5);
      var response = {};
      response.data = [];
      response.total = count;
      articals.forEach(function(artical) {
        response.data.push(artical)
      });
      res.send(response);
    })
  })

  app.get('/artical/:id',function (req,res){
    var articalId = req.params.id;
    co(function*(){
      yield Artical.where({articalId: articalId}).update({$inc: {visit: 1}});
      var artical = yield Artical.find({articalId: articalId});
      if(artical){
        res.send(artical[0].content);
      }else{
        res.status(403).end();
      }
    })
  })

  app.get('/comment',function (req,res){
    var articalId = req.query.articalId;
    co(function*(){
      var comment = yield Comment.find({articalId: articalId})
      if(comment){
        res.send(comment);
      }else{
        res.status(403).end();
      }
    })
  })

  app.post('/comment',function(req,res){
    if(req.session.code.toLowerCase() !== req.query.code.toLowerCase()){
      res.status(401)
      res.send({errMsg: '验证码输入错误'})
      return
    } 
    const articalId = req.query.articalId;
    const time = new Date().getTime();
    const author = req.query.author;
    const content = req.query.content;
    var comment = new Comment({
      commentId: uuid(),
      articalId: articalId,
      time: time,
      author: author,
      content: content
    })
    co(function*(){
      yield Artical.where({articalId: req.query.articalId}).update({$inc: {comment: 1}});
    })
    comment.save(function(err,data){
      if(err){
        res.status(403).end();
      }else{
        const response = `${new Date().pattern("yyyy-MM-dd EEE hh:mm:ss")},${author}发表了评论:${content}`
        let mailOptions = {
          from: '459192633@qq.com',
          to: 'york_lin@yeah.net',
          subject: '博客有人评论啦',
          html: `<p>${new Date().pattern("yyyy-MM-dd EEE hh:mm:ss")}${author}发表了评论:</p><pre>${content}</pre><p>详情点击<a href="http://www.yorklin.cn/#/artical/${articalId}">这里</a></p>`
        }
        transporter.sendMail(mailOptions,(err,info)=>{
          if(err){
            return console.log(err)
          }
        })
        res.send({Success: true})
      }
    })
  })
}
