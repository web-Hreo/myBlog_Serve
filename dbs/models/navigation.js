//后端管理-标签集合
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
