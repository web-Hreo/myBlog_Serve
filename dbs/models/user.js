const mongoose = require('mongoose')

let userSchma = new mongoose.Schema({
    userName:String,
    passWord:String
})

module.exports = mongoose.model('user',userSchma)