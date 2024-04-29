var express = require('express');
var admin = require('../controller/admincontroller')
var router = express.Router();

/* GET home page. */
router.post('/',admin.insertadmin);
router.post('/login',admin.login);

module.exports = router;
 