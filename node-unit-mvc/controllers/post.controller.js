const PostModel = require('../models/post.model');
const PostController = {};

PostController.create = (req, res) => {
    return PostModel.createPost(req.body, (err, post) => {
        if (err) {
            return res.status(500).end();
        } else {
            return res.json(post);
        }
    })

};

PostController.update = (req, res) => {
    const postId = req.params.postId;
    const updatedData = req.body;

    PostModel.updatePost(postId, updatedData, (err, updatedPost) => {
        if (err) {
            return res.status(500).end();
        } else {
            return res.json(updatedPost);
        }
    });
};

PostController.findPost = (req, res) => {
    const postId = req.params.postId;

    PostModel.findPost(postId, (err, foundPost) => {
        if (err) {
            return res.status(500).end();
        } else {
            return res.json(foundPost);
        }
    });
};

PostController.getAllPosts = (req, res) => {

};

module.exports = PostController;