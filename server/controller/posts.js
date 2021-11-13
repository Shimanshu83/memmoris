const postModel = require('../models/postModel');

const getPost = async (req, res) => {

    try {
        const post = await postModel.find({});
        return res.json(post)
    }
    catch (err) {
        res.status(500).json(err)
    }


}

const createPost = async (req, res) => {

    var post  = req.body;   
    try {
        post = await postModel.create({...post , creator : req.userId , createdAt : new Date().toISOString()  });
        return res.json(post)
    }
    catch (err) {
        res.status(500).json(err)
    }

}

const updatePost = async (req , res) => {
    const { title , message , creator , tags , selectedFile} = req.body;
    const { id } = req.params;
    try {
        const post = await postModel.findByIdAndUpdate(id, {
            title,
            message,
            creator,
            tags,
            selectedFile
        } ,{new : true});
        return res.json(post)
    }
    catch (err) {
        res.status(500).json(err)
    }           
}

const deletePost = async (req , res) => {
    const { id } = req.params;
    try {
        const post = await postModel.findByIdAndDelete(id);
        return res.json({success : true, data : post})
    }
    catch (err) {
        res.status(500).json(err)
    }
}

const likePost = async (req , res) => {
    const { id} = req.params;
    const userId = req.userId ; 
    try {
     
    const post = await postModel.findById(id);
    
    const index = await post.likes.findIndex((lid) => lid === String(userId)) ; 


    if(index === -1) {
        post.likes.push(req.userId) ; 
    }
    else {
        post.likes = post.likes.filter((id) => id !== String(userId)) ;
    }

    const updatePost = await postModel.findByIdAndUpdate(id, post,{new : true})
    return res.json(updatePost) ; 

    } catch (error) {
        console.log(error) ;   
    }
}
module.exports = {getPost , createPost, updatePost,deletePost , likePost} ; 
