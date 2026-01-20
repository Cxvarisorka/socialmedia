const { writeFile, readFile } = require("../utils/file");
const path = require('path');
const fs = require('fs');

const FILE_URL = path.join(__dirname, '../database/posts.json');

// To create new post
const createPost = (req, res) => {
    const { title, content, userId } = req.body;

    if(!title || !content || !userId) {
        return res.status(400).json({ message: "All data is required!" });
    };

    const post = {
        title,
        content,
        userId,
        id: Date.now()
    };

    writeFile(post, FILE_URL);

    res.status(201).json(post);
};

// To get all posts
const getPosts = (req, res) => {
    const posts = readFile(FILE_URL);

    res.json(posts);
};

// To get user posts
const getUserPosts = (req, res) => {
    const { userId } = req.params;

    if(!userId) {
        return res.status(400).json({ message: "User ID is required!" });
    }

    const posts = readFile(FILE_URL);
    const usersPosts = posts.filter(post => post.userId === Number(userId));

    res.json(usersPosts);
};

// To delete post
const deletePost = (req, res) => {
    const { postId, userId } = req.params;

    const posts = readFile(FILE_URL);
    const post = posts.find(p => p.id === Number(postId));

    if(!post) {
        return res.status(404).json({ message: "Post not found!" });
    }

    if(post.userId !== Number(userId)) {
        return res.status(401).json({ message: "You are not authorized to delete this post!" });
    }

    const newPosts = posts.filter(p => p.id !== Number(postId));
    fs.writeFileSync(FILE_URL, JSON.stringify(newPosts));

    res.status(200).json(newPosts);
};

// To edit post
const editPost = (req, res) => {
    const { postId, userId } = req.params;
    const { title, content } = req.body;

    const posts = readFile(FILE_URL);
    const post = posts.find(p => p.id === Number(postId));

    if(!post) {
        return res.status(404).json({ message: "Post not found!" });
    }

    if(post.userId !== Number(userId)) {
        return res.status(401).json({ message: "You are not authorized to edit this post!" });
    }

    if(title) post.title = title;
    if(content) post.content = content;

    fs.writeFileSync(FILE_URL, JSON.stringify(posts));
    res.status(200).json(posts);
};



module.exports = { createPost, getPosts, getUserPosts, deletePost, editPost };