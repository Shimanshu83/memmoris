const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : {
        type : String, required : false
    },
    firstName : {
        type : String, required : true
    },
    lastName : {
        type : String, required : true
    },
    
    email : {
        type : String, required : true , unique : true
    },
    password : {
        type : String, required : true 
    }
},{timestamps : true })

module.exports = mongoose.model('User' , userSchema); 