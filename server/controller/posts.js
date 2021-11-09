const postModel = require('../models/postModel');

const getPost = async (req, res) => {

    try {
        const post = await postModel.find({});
        return res.json({data : post})
    }
    catch (err) {
        res.status(500).json(err)
    }


}

const createPost = async (req, res) => {
    const { title , message , creator , tags , selectedFile} = req.body;   
    try {
        const post = await postModel.create({
            title,
            message,
            creator,
            tags,
            selectedFile
        });
        return res.json({data : post})
    }
    catch (err) {
        res.status(500).json(err)
    }

}

module.exports = {getPost , createPost} ; 