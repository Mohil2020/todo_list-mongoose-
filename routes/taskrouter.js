var express = require('express');
var task = require('../controller/taskcontroller')
var router = express.Router();

/* GET home page. */
router.post('/',task.insertdata);
router.post('/all',task.gettask);
router.post('/one',task.getonetask);

module.exports = router;
 