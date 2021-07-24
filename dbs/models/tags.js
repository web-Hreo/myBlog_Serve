/**
  @name: 'tags',
  @desc: '标签集合'
  @author: HeHua,
  @createDate: 2021年07月24日 10:05:08,
  @changeDate: ,
 */
const mongoose = require('mongoose')
const TagsSchema  = new mongoose.Schema({
  name:String,
  createTime:String,
  changeTime:String,
})

module.exports = mongoose.model('tags',TagsSchema,"tags")
