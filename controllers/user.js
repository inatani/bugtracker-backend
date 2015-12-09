/**
 * Created by inatani on 10/7/15.
 */
var Models = require('../models');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 8;

var UserController_ = {
    create : function (req, res) {
        var register = req.body;
        Models.User.findOne({emailID:register.emailID}, function (err, response){
            if (err) throw err;
            if(response){
                res.status(200).send({error:"User already exists"});
                return
            }
            var user = new Models.User(req.body);
            user.save(function (err, response) {
                if (err) throw err;
                console.log("Create User Result "+JSON.stringify(response));
                res.status(200).send({status:"success"});
            });
        });
    },
    getAll : function (req, res) {
        Models.User.find(function (err, response) {
            if(err) throw err;
            res.status(200).send(response)
        });
    },
    getOne : function (req, res){
        Models.User.findOne({emailID:req.params.emailID}, function (err, response){
            if (err) throw err;
            res.status(200).send(response);
        });
    },
    update : function (req, res){
        var user = new Models.User(req.body);
        if(user.password){
          if (!user.isModified('password')) return;
          req.body.password = bcrypt.hashSync(user.password, 8);
        }
        Models.User.findOneAndUpdate({emailID:req.params.id},{$set:req.body},{upsert:true},function(err, response){
            if(err) throw err;
            res.status(200).send({status:"success"});
        });
    },
    delete : function(req,res){
        Models.User.findOneAndRemove({emailID:req.params.emailID},function(err, response){
            if(err) throw err;
            res.status(200).send({status:"success"});
        });
    }
};

module.exports = UserController_;
