const mongoose = require('./connection');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }
}
);

const Post = mongoose.model('posts', postSchema);

exports.updatePost = (postId, updatedData, next) => {
    Post.findByIdAndUpdate(postId, updatedData, { new: true }, (err, updatedPost) => {
        if (err) {
            next(err);
        } else {
            next(null, updatedPost);
        }
    });
}

exports.createPost = (obj, next) => {
    const post = new Post(obj);

    post.save(function (err, post) {
        next(err, post)
    })
}
