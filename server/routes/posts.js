const router = require('express').Router() ; 

const postModel = require('../models/postModel'); 
const isAuth = require('../middleware/isAuthenticated');
const {getPost , createPost , updatePost , deletePost , likePost} = require('../controller/posts'); 

router.get('/' , getPost)

router.post('/' , isAuth , createPost)

router.put('/:id' ,isAuth ,  updatePost)

router.delete('/:id' , isAuth ,  deletePost) 

router.put('/:id/like' ,isAuth,  likePost) ; 

module.exports = router;