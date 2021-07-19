//后端管理-标签集合
const mongoose = require('mongoose')
const NavigationTagsSchema  = new mongoose.Schema({
  name:String,
  createTime:String,
  changeTime:String,
})

module.exports = mongoose.model('navigationTags',NavigationTagsSchema,"navigationTags")
