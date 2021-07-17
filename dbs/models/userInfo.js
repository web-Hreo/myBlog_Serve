const mongoose = require('mongoose')

const UserInfoSchema  = new mongoose.Schema({
  address:String,
  name:String,
  avatar:String,
  userId:Number,
  time:{ type:Date, default:Date.now }
})

module.exports = mongoose.model('userInfo',UserInfoSchema,"userInfo")
