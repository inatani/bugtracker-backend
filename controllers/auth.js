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
    var userInfo = {
      "username" : username,
      "password" : password
    };

    auth.validateUser(userInfo, function(err, result){
      if(err){
        res.status(401);
        res.json({
          "status" : 401,
          "message" : "Invalid Username Password"
        });
        return;
      } else {
        console.log(JSON.stringify(result));
        res.json(genToken(result));
      }
    });
  },
  validateUser : function (userInfo, callback){
    var username = userInfo.username;
    var password = userInfo.password;
    userModel.findOne({emailID : username},function(err, user){
        if(err) throw err;
      user.comparePassword(password, function(err, isMatch){
            if (err) throw err;
            console.log('Password : '+ isMatch);
            if(isMatch){
              //console.log("user doc "+JSON.stringify(user));
              callback(null, user);
            } else{
              callback(null, err);
            }
        });
    });
  }
};

function genToken(user){
  var expires = expiresIn(1);
  var token = jwt.encode({
    exp:expires
  }, require('../utilities/secret')());

  var filteredUser = {
    username : user.firstName + " " + user.lastName,
    emailid : user.emailID,
    role : user.role,
    empid : user.empID
  };

  return {
    token : token,
    expires : expires,
    user : filteredUser
  };
}

function expiresIn(numberInDays){
  var date = new Date();
  return date.setDate(date.getDate()+numberInDays);
}

module.exports = auth;
