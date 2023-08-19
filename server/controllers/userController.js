// GET /
// POST / 
// dashboard
const User_entity = require('../modules/users')
const mongoose = require('mongoose');


exports.dashboard = async (req, res) => {
    const locals = {
        title:"User management system",
    }

    let perPage = 5
    let page = req.query.page || 1

    try {
        const users = await User_entity.aggregate([{ $sort: {updateAt:-1}}])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();
        const count = await User_entity.count()
        res.render('index', {users, locals, message: req.flash('success'), current: page, pages: Math.ceil(count / perPage)})
    }
    catch (err) {
        console.log(err)
    }
}

exports.add_user = async (req, res) => {
    const locals = {
        title: "Add New User"
    }

    res.render('users/add_user', locals)
}


exports.post_add_user = async (req, res) => {
    console.log(req.body)

    const  newUser = new User_entity({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        det: req.body.details,
    });
    
    try {
        await User_entity.create(newUser)
        req.flash('success', 'User created successfully')
        res.redirect('/')
    }
    catch (err) {
        console.log(err)
    }    

}