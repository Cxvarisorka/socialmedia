const { writeFile, readFile } = require("../utils/file");
const path = require('path');

const FILE_URL = path.join(__dirname, '../database/posts.json');

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

const getPosts = (req, res) => {
    const posts = readFile(FILE_URL);

    res.json(posts);
};

const getUserPosts = (req, res) => {
    const { userId } = req.params;

    if(!userId) {
        return res.status(400).json({ message: "User ID is required!" });
    }

    const posts = readFile(FILE_URL);
    const usersPosts = posts.filter(post => post.userId === Number(userId));

    res.json(usersPosts);
};

module.exports = { createPost, getPosts, getUserPosts };