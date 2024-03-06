const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes

router.get('/', userController.view);
router.post('/', userController.find);
router.post('/result', userController.finds);
router.get('/login', userController.login);
router.get('/result', userController.views);
router.get('/addproject', userController.form);
router.post('/addproject', userController.create);
router.get('/addresult', userController.forms);
router.post('/dologin',userController.dologin);
router.post('/addresult', userController.creates);
router.get('/viewproject/:id', userController.viewall);
router.get('/addmembers/:id', userController.addmember);
router.post('/addmembers', userController.addmembers);
router.post('/editproject', userController.editprojects);
router.get('/deletemember/:id/:prid', userController.deletemember);
router.get('/deleteproject/:id', userController.deleteproject);
router.get('/viewstudent/:id', userController.viewstudent);
router.get('/editproject/:id', userController.editproject);
router.get('/homePage', userController.homePage);
router.get

module.exports = router;