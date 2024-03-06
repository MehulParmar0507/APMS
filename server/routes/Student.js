const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/homePage', studentController.homePage);
router.post('/dologinStudent', studentController.dologinStudent)

module.exports = router;