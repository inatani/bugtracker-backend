var jwt = require('jwt-simple');
var validateUser = require("../controllers/auth").validateUser;

var validateRequests = function(req, res, next){
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) ||(req.headers['x-access-token']);
  var key =  (req.body && req.body.x_key) || (req.query && req.query.x_key) ||(req.headers['x-key']);

  if (token || key){
    try{
      var decoded = jwt.decode(token, require('../utilities/secret'));
      if(decoded.exp <=Date.now()){
        res.state(400);
        res.json({
          "status" : 400,
          "message" : "Token Expired"
        });
        return;
      }
      var loginUser = validateUser(key);
      if(loginUser){
        if((req.url.indexOf('admin')>=0 && loginUser.role=='admin') || (req.url.indexOf('admin')>0 && req.url.indexOf('/api/')>=0)){
          next();
        } else {
          res.status(403);
          res.json({
            "status" : 403,
            "message" : "unauthorized user"
          });
          return;
        }
      } else {
        res.status(401);
        res.json({
          "status" : 401,
          "message" : "invalid user"
        });
      }
    } catch(err) {
      res.status(500);
      res.json({
        "status" : 500,
        "message" : err
      });
    }
  } else {
    res.status(401);
    res.json({
      "status" : 401,
      "message" : "Invalid Token or Key"
    });
    return;
  }
};
module.exports = validateRequests;