const express= require('express');
const { register, login, editProfile, getProfile } = require('../controller/auth/authController');
const { createComment, editComment, deleteComment, getComment } = require('../controller/post/commentController');
const { createLikes } = require('../controller/post/likeController');
const { createPost, editPost, deletePost, getPost, viewPost } = require('../controller/post/postController');
const router= express.Router()
const  userAuth= require('../middleware/Auth');
const upload = require('../middleware/uploadImage');


// auth
router.post('/register',register);
router.post('/login',login);
router.post('/edit-profile',userAuth,editProfile)
router.get('/profile',userAuth,getProfile)

// post
router.post('/create-post',[userAuth,upload.any()],createPost);
router.post('/edit-post/:id',userAuth,editPost);
router.delete('/remove-post/:id',userAuth,deletePost)
router.get('/get-post',userAuth,getPost);
router.get('/view-post/:id',userAuth,viewPost);



// comments
router.post('/create-comment/:id',userAuth,createComment);
router.post('/edit-comment/:id',userAuth,editComment);
router.delete('/remove-comment/:id',userAuth,deleteComment)
router.get('/my-comments',userAuth,getComment)

// like
router.post('/like',userAuth,createLikes)

module.exports=router;