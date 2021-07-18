const mongoose = require('mongoose')

const UserDescSchema  = new mongoose.Schema({
  userId:Number,
  desc:String,
})

module.exports = mongoose.model('userDesc',UserDescSchema,"userDesc")
