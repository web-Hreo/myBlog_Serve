/**
  @name: 'project',
  @desc: '项目分享管理集合'
  @author: HeHua,
  @createDate: 2021年07月24日 10:05:22,
  @changeDate: ,
 */
const mongoose = require('mongoose')
const ProjectSchema  = new mongoose.Schema({
  name:String,
  title:String,
  imgSrc:String,
  href:String,
})

module.exports = mongoose.model('project',ProjectSchema,"project")
