var Artical = require('../model/Artical');

module.exports = {
  countArtical: (callback) => {
    Artical.count({},(err,count) => {
      if(err){
        callback(err)
      }else{
        callback(null,count)
      }
    })
  }
}