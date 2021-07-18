//文章管理模型
const mongoose = require('mongoose')

const ArticleSchema  = new mongoose.Schema({
  title:String,
  viewImg:String,
  cont:String,
  tag:String,
  createTime:String,
  changeTime:String,
  viewNum:Number,
})

module.exports = mongoose.model('article',ArticleSchema,"article")
