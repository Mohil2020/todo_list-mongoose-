var express = require('express');
var router = express.Router();
var staff = require('../controller/staffcontroller')

/* GET users listing. */
router.post('/',staff.staff);
router.post('/login',staff.login);
router.get('/view',staff.view);
router.get('/logout',staff.logout);
router.get('/one/:id',staff.getone);
router.put('/update_user/:id',staff.updatestaff);
router.delete('/delete_user/:id',staff.deletestaff);
router.get ('/staffview_task',staff.viewtaskstaff);
router.get ('/accept/:id',staff.accept);
router.get ('/decline/:id',staff.decline);
router.get ('/complated/:id',staff.complated);


module.exports = router;
