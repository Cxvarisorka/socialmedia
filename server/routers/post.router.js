const express = require('express');

// Controllers
const { createPost, getPosts, getUserPosts, deletePost, editPost } = require('../controllers/post.controller');

const postRouter = express.Router();

postRouter.post('/', createPost);
postRouter.get('/', getPosts);
postRouter.get('/user/:userId', getUserPosts);
postRouter.delete('/:postId/:userId', deletePost);
postRouter.patch('/:postId/:userId', editPost);

module.exports = postRouter;