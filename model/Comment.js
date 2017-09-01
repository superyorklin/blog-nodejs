var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  commentId: {type: String , unique: true},
  articalId: String,
  time: Date,
  author: String,
  content: String
})

module.exports = mongoose.model('Comment',CommentSchema);