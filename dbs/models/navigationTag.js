/**
  @name: 'navigationTags',
  @desc: '学习资源外部标签集合'
  @author: HeHua,
  @createDate: 2021年07月24日 10:05:38,
  @changeDate: ,
 */
const mongoose = require('mongoose')
const NavigationTagsSchema  = new mongoose.Schema({
  name:String,
  createTime:String,
  changeTime:String,
})

module.exports = mongoose.model('navigationTags',NavigationTagsSchema,"navigationTags")
