const mongoose = require('mongoose')

const UserInfoSchema  = new mongoose.Schema({
  address:String,
  name:String,
  avatar:String,
  userId:Number,
  createTime:String,
})

module.exports = mongoose.model('userInfo',UserInfoSchema,"userInfo")
