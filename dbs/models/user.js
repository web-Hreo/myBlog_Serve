/**
  @name: 'user',
  @desc: '用户账号密码表'
  @author: HeHua,
  @createDate: 2021年07月24日 10:04:50,
  @changeDate: ,
 */
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName:String,
    passWord:String,
    userId:Number,
})
module.exports = mongoose.model('user',userSchema,'user')