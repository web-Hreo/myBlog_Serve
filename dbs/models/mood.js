//后端管理-日志集合
const mongoose = require('mongoose')
const MoodSchema  = new mongoose.Schema({
  cont:String,
  createTime:String,
  changeTime:String,
})

module.exports = mongoose.model('mood',MoodSchema,"mood")
