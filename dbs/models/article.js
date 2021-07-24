/**
  @name: 'article',
  @desc: '文章管理集合'
  @author: HeHua,
  @createDate: 2021年07月24日 10:06:51,
  @changeDate: ,
 */
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
