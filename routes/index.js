var express = require('express');
var router = express.Router();

var routes = {
    user : require("../controllers/user"),
    project : require('../controllers/project')
};

//user
router.post('/api/user', routes.user.create);
router.get('/api/user', routes.user.getAll);
router.get('/api/user/:id',routes.user.getOne);
router.post('/api/user/:id',routes.user.update);
router.delete('/api/user/:id',routes.user.delete);

//project


module.exports = router;
