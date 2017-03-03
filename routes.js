var express = require('express');
var router = express.Router();
var projectController = require('./Controller/Ctrl');
var multer = require('multer');
var storage = multer.diskStorage(
       {
           destination:function(req,file,cb){cb(null,'uploads/')},
           filename:function(req,file,cb){cb(null,file.originalname)}
       });

var upload=multer({storage:storage});

//routes:
router.post('/',projectController.login);
router.post('/register',projectController.register);
router.post('/uploadpp',upload.single('myfile'), projectController.uploadpp);
router.post('/uploadSnap',upload.single('myfile'), projectController.uploadSnap);
router.post('/uploadUrl',projectController.uploadUrl);
router.post('/updateSnap',upload.single('myfile'),projectController.updateSnap);
router.post('/updateUrl',projectController.updateUrl);

router.get('/',projectController.home);
router.get('/studentsignup',projectController.signup);
router.get('/goToWork',projectController.skipPP);
router.get('/submit', projectController.submit);
router.get('/views',projectController.views);
router.get('/accountView',projectController.accountView);
router.get('/accountViewf',projectController.accountViewf);

module.exports=router;
