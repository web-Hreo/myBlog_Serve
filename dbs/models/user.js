const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName:String,
    passWord:String,
    userId:Number,
})
module.exports = mongoose.model('user',userSchema,'user')