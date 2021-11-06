const router = require('express').Router() ; 

const postModel = require('../models/postModel'); 
const {getPost , createPost} = require('../controller/posts'); 

router.get('/' , getPost)


router.post('/' , createPost)

module.exports = router;