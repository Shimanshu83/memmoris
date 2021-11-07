const postModel = require('../models/postModel');

const getPost = async (req, res) => {

    try {
        let postMessages = await postModel.find() ;
        return res.status(200).json(postMessages) ;  
    }
    catch (err) {
        res.status(500).json(err)

    }

}

const createPost = (req, res) => {
    const post  = req.body ; 
    const newPost = new postModel(post); 
    try {
        await newPost.save() ; 

        
    } catch (error) {
        
        
    }

}

module.exports = {getPost , createPost} ; 