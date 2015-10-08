/**
 * Created by inatani on 10/7/15.
 */
//register the modules
var mongoose = require("mongoose");

//initiate the collection for user

var User_ = new mongoose.Schema({
    firstName:String,
    lastName:String,
    emailID:String,
    PhoneNumber:String,
    password:String,
    empID:{type:String,unique:true}
});

var userPersonalInformationModel = mongoose.model('user', User_);
module.exports = userPersonalInformationModel;