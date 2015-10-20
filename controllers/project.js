/**
 * Created by inatani on 10/18/15.
 */
var ProjectController_ = {
    createProject : function (req, res) {
        var register = req.body;
        Models.project.findOne({acctID:register.empID}, function (err, response){
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
    }
};

module.exports = ProjectController_;