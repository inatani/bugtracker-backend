/**
 * Created by inatani on 10/7/15.
 */
var Models = require('../models');
var UserController_ = {
    create : function (req, res) {
        var register = req.body;
        Models.User.findOne({empID:register.empID}, function (err, response){
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
        var id = req.params.id;
        Models.User.findOne({empID:id}, function (err, response){
            if (err) throw err;
            res.status(200).send(response);
        });
    },
    update : function (req, res){
        var user = new Models.User(req.body);
        Models.User.findOneAndUpdate({empID:req.params.id},{$set:req.body},{upsert:true},function(err, response){
            if(err) throw err;
            res.status(200).send({status:"success"});
        });
    },
    delete : function(req,res){
        Models.User.findOneAndRemove({empID:req.params.id},function(err, response){
            if(err) throw err;
            res.status(200).send({status:"success"});
        });
    }
};

module.exports = UserController_;
