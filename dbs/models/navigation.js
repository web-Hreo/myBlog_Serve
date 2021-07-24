/**
  @name: 'navigation',
  @desc: '学习资源内部列表集合'
  @author: HeHua,
  @createDate: 2021年07月24日 10:05:54,
  @changeDate: ,
 */
const mongoose = require('mongoose')
const NavigationSchema  = new mongoose.Schema({
  navigationTag:String,
  title:String,
  desc:String,
  imgSrc:String,
  url:String,
  createTime:String,
  changeTime:String,
})

module.exports = mongoose.model('navigation',NavigationSchema,"navigation")
