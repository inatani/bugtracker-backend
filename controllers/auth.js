var jwt = require('jwt-simple');
var userModel = require('../models/user');

var auth = {
  loginUser : function (req, res){
    var username = req.body.username || '';
    var password = req.body.password || '';

    if(username == '' || password == ''){
      res.status(401);
      res.json({
        "status" : 401,
        "message" : "unauthorized"
      });
      return;
    }
    var getUserInfo = auth.validateUser(username, password);
    if(!getUserInfo){
      res.status(401);
      res.json({
        "status" : 401,
        "message" : "unauthorized"
      });
      return;
    }
    if(getUserInfo){
      res.json(genToken(getUserInfo));
    }
  },
  validateUser : function(username, password){
    userModel.findOne({emailID : username},function(err, user){
        if(err) throw err;
        userModel.comparePassword(password, function(err, isMatch){
            if (err) throw err;
            console.log('Password : '+ isMatch);
            if(isMatch){
              return user;
            } else{
              return err;
            }
        });
    });
  }
}

function genToken(user){
  var expires = expiresIn(1);
  var token = jwt.encode({
    exp:expires
  }, require('../utilities/secret')());
  return {
    token : token,
    expires : expires,
    user : user
  };
}

function expiresIn(numberInDays){
  var date = new Date();
  return date.setDate(date.getDate()+numberInDays);
}

module.exports = auth;
