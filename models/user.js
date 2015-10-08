/**
 * Created by inatani on 10/7/15.
 */
var mongoose = require("mongoose");

var User_ = new mongoose.Schema({
    firstName:String,
    lastName:String,
    emailID:String,
    PhoneNumber:String,
    password:String,
    empID:{type:String,unique:true}
});

module.exports = mongoose.model('user', User_);
