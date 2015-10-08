/**
 * Created by inatani on 10/7/15.
 */
var MONGOPATH = process.env.MONGO_URL || "127.0.0.1";
var MONGODB_URL = "mongodb://"+MONGOPATH+"/bugtracker";

var connectDB = {
    DB_URL : MONGODB_URL
};
module.exports = connectDB;