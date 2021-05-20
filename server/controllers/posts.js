const mongoose = require('mongoose');
const PostMessage = require('../models/postMessage.js');

const getPosts = async (req, res) => {
    try {
        const postMessaages = await PostMessage.find();

        res.status(200).json(postMessaages);
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log('error' + error.message);
    }
}


const createPosts = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post);
    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, ..._id }, { new: true });

    res.json(updatedPost);
}

const deletePost = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${_id}`);

    await PostMessage.findByIdAndRemove(_id);

    console.log("Delete");

    res.json({ message: 'Post delete successfully!' });


}

const likePost = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${_id}`);

    const post = await PostMessage.findById(_id);
    const postUpdated = await PostMessage.findByIdAndUpdate(_id, { likeCount: post.likeCount + 1 }, { new: true });

    console.log('Liked');

    res.json(postUpdated);
}

module.exports = { getPosts, createPosts, updatePost, deletePost,likePost };
