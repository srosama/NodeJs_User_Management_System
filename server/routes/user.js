const express = require('express');
const { model } = require('mongoose');
const userController = require('../controllers/userController');
const router = express.Router()
const app = express();

//User routes
router.get('/', userController.dashboard)
router.get('/add', userController.add_user)
router.post('/add', userController.post_add_user)

//View
router.get('/view/:id', userController.view_user)

// Edit
router.get('/edit/:id', userController.edit)
router.post('/edit/:id', userController.post_edit)

// Delete
router.post('/delete/:id', userController.deleteUser)

// Search
router.post('/search', userController.searchUser)

// about
router.get('/about', userController.about)


module.exports = router