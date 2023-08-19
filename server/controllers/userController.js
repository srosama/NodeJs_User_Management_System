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


/// View users 


exports.view_user = async (req, res) => {
    try { 
        const user_info = await User_entity.findOne({ _id: req.params.id})
        const locals = {
            title: "View Users"
        }
        res.render('users/view_user', {locals, user_info})
    } catch (err) {
        console.log(err)
    }
}


// Edit 
exports.edit = async (req, res) => {

    try {
      const user_info = await User_entity.findOne({ _id: req.params.id })
  
      const locals = {
        title: "Edit User",
      };
  
      res.render('users/edit', {
        locals,
        user_info
      })
  
    } catch (error) {
      console.log(error);
    }
  
  }
  
  
  
exports.post_edit = async (req, res) => {
    try {
      await User_entity.findByIdAndUpdate(req.params.id,{
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.tel,
        email: req.body.email,
        det: req.body.details,
        updateAt: Date.now()
      });
      if (User_entity){
          req.flash('success', `User Updated successfully ${req.body.firstName}`);
      }
      await res.redirect(`/edit/${req.params.id}`);
      
      console.log('redirected');
    } catch (error) {
      console.log(error);
    }
  }
  
  

// delete 
exports.deleteUser = async (req, res) => {
    try {
      await User_entity.deleteOne({ _id: req.params.id });
      req.flash('success', `User Deleted successfully`);
      res.redirect("/")
    } catch (error) {
      console.log(error);
    }
  }
  
  



// Search
exports.searchUser = async (req, res) => {
  
    const locals = {
      title: "Search Customer Data",
    };
  
    try {
      let searchTerm = req.body.searchTerm;
      const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
  
      const user_info = await User_entity.find({
        $or: [
          { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") }},
          { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") }},
        ]
      });
  
      res.render("search", {
        user_info,
        locals
      })
      
    } catch (error) {
      console.log(error);
    }
  
  }


// about
exports.about = (req, res) => {
    res.render("about")
}