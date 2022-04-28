const router = require("express").Router();
const {viewPosts,viewSinglePost, createPosts,updatePosts,deletePosts,addComment,voteComment,editComment,deleteComment} = require("../controllers/posts");
const {createCommunity, readCommunity,joinCommunity} = require('../controllers/community');
const {signup_post,login_post,update_password} = require('../controllers/user');

// posts routes
router.post('/posts/create', createPosts);
router.get('/posts/get',viewPosts);
router.get('/posts/get/:id',viewSinglePost);
router.put('/posts/update', updatePosts);
router.delete('/posts/delete',deletePosts);
router.put('/posts/addComment',addComment);
router.put('/posts/addVote',voteComment);
router.put('/posts/editComment',editComment);
router.delete('/posts/deleteComment',deleteComment);

// communities routes
router.post('/community/create', createCommunity);
router.get('/community/read', readCommunity);
router.put('/community/join',joinCommunity);

// authentication routes
router.post('/auth/signup', signup_post);

router.post('/auth/login', login_post);

router.post('/auth/changePassword',update_password);

module.exports = router;