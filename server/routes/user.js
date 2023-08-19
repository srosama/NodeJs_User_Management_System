const express = require('express');
const { model } = require('mongoose');
const userController = require('../controllers/userController');
const router = express.Router()
const app = express();

//User routes
router.get('/', userController.dashboard)
router.get('/add', userController.add_user)
router.post('/add', userController.post_add_user)


module.exports = router