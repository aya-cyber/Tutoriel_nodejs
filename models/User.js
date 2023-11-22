const mongoose = require('mongoose');
const Schema=mongoose.Schema
const userSchema=new Schema({
    name:String,
    gmail:String,
    password:Number,
})
const User=mongoose.model("User",userSchema)
module.exports=User