/**
  @name: 'userDesc',
  @desc: '用户信息集合'
  @author: HeHua,
  @createDate: 2021年07月24日 10:04:26,
  @changeDate: ,
 */
const mongoose = require('mongoose')

const UserDescSchema  = new mongoose.Schema({
  userId:Number,
  desc:String,
})

module.exports = mongoose.model('userDesc',UserDescSchema,"userDesc")
