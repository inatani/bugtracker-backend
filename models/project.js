/**
 * Created by inatani on 10/18/15.
 */
var mongoose = require("mongoose");

var Project_ = new mongoose.Schema({
    acctName:String,
    acctMgr:String,
    acctID:{type:String,unique:true},
    project : [Schema.Types.Mixed]
},{strict:false});

module.exports = mongoose.model('project', Project_);
