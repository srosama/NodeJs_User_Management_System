const express = require('express');
const { model } = require('mongoose');
const userController = require('../controllers/userController');
const router = express.Router()
const app = express();


//User routes
router.get('/', userController.dashboard)


module.exports = router