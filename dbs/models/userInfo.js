/**
  @name: 'userInfo',
  @desc:用户信息
  @author: HeHua,
  @createDate: 2021年07月22日 00:49:33,
  @changeDate: ,
 */
const mongoose = require('mongoose')

const UserInfoSchema  = new mongoose.Schema({
  address:String,
  name:String,
  avatar:String,
  userId:Number,
  createTime:String,
})

module.exports = mongoose.model('userInfo',UserInfoSchema,"userInfo")
