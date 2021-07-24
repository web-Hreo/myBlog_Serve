/**
  @name: 'mood',
  @desc: '日志集合'
  @author: HeHua,
  @createDate: 2021年07月24日 10:06:27,
  @changeDate: ,
 */
const mongoose = require('mongoose')
const MoodSchema  = new mongoose.Schema({
  cont:String,
  createTime:String,
  changeTime:String,
})

module.exports = mongoose.model('mood',MoodSchema,"mood")
