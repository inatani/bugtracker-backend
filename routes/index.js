var express = require('express');
var router = express.Router();

var routes = {
    user : require("../controllers/user")
};

router.post('/api/user', routes.user.createUser);
router.get('/api/user', routes.user.getAllUser);
router.get('/api/user/:id',routes.user.getUserByID);
router.post('/api/user/:id',routes.user.updateUserByID);
router.delete('/api/user/:id',routes.user.removeUserByID);

module.exports = router;