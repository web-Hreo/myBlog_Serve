//文章管理模型
const mongoose = require('mongoose')

const LinkSchema  = new mongoose.Schema({
  title:String,//博客名称
  desc:String,//博客描述
  type:String,//所属卡片
  avatar:String,//博客头像
  url:String,//博客链接
  createTime:String,//创建时间
  changeTime:String,//更改时间
})

module.exports = mongoose.model('link',LinkSchema,"link")
