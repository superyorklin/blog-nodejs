var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticalSchema = new Schema({
  articalId: {type: String, unique: true},
  title: String,
  time: Date,
  desc: {type: String ,default: '博主很懒，没有留下任何描述'},
  tag: Array,
  visit: {type: Number,default: 0},
  comment: {type: Number,default: 0}
})

module.exports = mongoose.model('Artical',ArticalSchema);