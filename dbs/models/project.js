//后端管理-项目分享管理集合
const mongoose = require('mongoose')
const ProjectSchema  = new mongoose.Schema({
  name:String,
  title:String,
  imgSrc:String,
  href:String,
})

module.exports = mongoose.model('project',ProjectSchema,"project")
