/**
  @name: 'comment',
  @desc: '留言板内留言者信息'
  @author: HeHua,
  @createDate: 2021年07月24日 10:50:02,
  @changeDate: ,
 */
const mongoose = require('mongoose')

const CommentSchema  = new mongoose.Schema({
  from:String,//留言来源 是否来自文章/日志/留言板等
  fromId:String,//留言来源id 若来自文章/日志 那么他需要一个来源id
  fromIp:String,//留言来源IP 同一ip当天留言超过100条 禁止再留言
  leavingName:String,//留言者名称
  leavingEmail:String,//留言者邮箱
  leavingAvatar:String,//留言者头像
  leavingUrl:String,//留言者网址
  leavingCont:String,//留言者输入内容
  commentId:Number,//留言id
  parentId:Number, //当前留言父级id 默认为0 如果回复他人 必传他人id做为父级id且需要传他人信息
  replyLevel:Number,//回复层级 0为留言 1为1级回复 2为2级回复
  replyName:String,//回复他人名称 当replyLevel为1/2时 需传replyName
  dateNow:String,//时间戳 用于判断当前用户留言相差秒数使用
  createTime:String,//创建时间
  changeTime:String,//更改时间
})

module.exports = mongoose.model('comment',CommentSchema,"comment")
