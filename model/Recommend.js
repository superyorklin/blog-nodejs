var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecommendSchema = new Schema({
  author: String,
  title: String,
  url: String,
  tag: Array,
  desc: String
})

module.exports = mongoose.model('Recommend',RecommendSchema);