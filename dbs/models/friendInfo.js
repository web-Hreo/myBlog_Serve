/**
  @name: 'friendInfo',
  @desc: '留言板内留言者信息'
  @author: HeHua,
  @createDate: 2021年07月24日 10:46:57,
  @changeDate: ,
 */
const mongoose = require('mongoose')

const FriendInfoSchema  = new mongoose.Schema({
  leavingName:String,//留言者名称
  leavingEmail:String,//留言者邮箱
  leavingAvatar:String,//留言者头像
  createTime:String,//创建时间
  changeTime:String,//更改时间
})

module.exports = mongoose.model('friendInfo',FriendInfoSchema,"friendInfo")
