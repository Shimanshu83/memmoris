const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title : String ,
    message : String ,
    creator : String ,    
    name : String ,             
    tags : [String], 
    selectedFile : String ,
    likes : {
        type : [String],
        default : []
    },
    createdAt : {
        type : Date , 
        default : new Date() 
    }
})

// what we have to do is just to add the id in the post likes array and every thingh will work out thanks 

module.exports = mongoose.model('postModel' , postSchema); 