const mongoose = require('mongoose');
const Schema = mongoose.Schema

const User_entity = new Schema({
    firstName: {
        type:String, 
        required: true,
    },
    lastName: {
        type:String, 
        required: true,
    },
    phone: {
        type:String, 
        required: true,
    },
    email: {
        type:String, 
        required: true,
    },
    det: {
        type:String, 
        required: true,
    },
    createdAT: {
        type:Date, 
        default:  Date.now()
    },
    updateAt: {
        type:Date, 
        default:  Date.now()
    },
});

module.exports = mongoose.model('users', User_entity)