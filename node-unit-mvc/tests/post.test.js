const sinon = require('sinon');
const PostModel = require('../models/post.model');
const PostController = require('../controllers/post.controller');

describe('Post controller', () => {
    // Setup the responses
    let req = {
        body: {
            author: 'stswenguser',
            title: 'My first test post',
            content: 'Random content'
        }
    };

    let error = new Error('Some error message'); // Fix: Remove the curly braces around the error message

    let res = {};

    let expectedResult;

    describe('create', () => {
        var createPostStub;

        beforeEach(() => {
            // Before every test case setup first
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            // Executed after the test case
            createPostStub.restore();
        });

        it('should return the created post object', () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                title: 'My first test post',
                content: 'Random content',
                author: 'stswenguser',
                date: Date.now()
            };

            createPostStub = sinon.stub(PostModel, 'createPost').yields(null, expectedResult);

            // Act
            PostController.create(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.createPost, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req.body.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: req.body.author }));
        });

        // Error Scenario
        it('should return status 500 on server error', () => {
            // Arrange
            createPostStub = sinon.stub(PostModel, 'createPost').yields(error);

            // Act
            PostController.create(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.createPost, req.body);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('update', () => {
        var updatePostStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };

            updatePostStub = sinon.stub(PostModel, 'updatePost');
        });

        afterEach(() => {
            updatePostStub.restore();
        });

        it('should return the updated post object', () => {
            // Arrange
            const postId = '507asdghajsdhjgasd';
            const updatedPost = {
                _id: postId,
                title: 'Updated test post',
                content: 'Updated content',
                author: 'stswenguser',
                date: Date.now()
            };

            req.params = { postId };
            req.body = updatedPost;

            updatePostStub.withArgs(postId, req.body).yields(null, updatedPost);

            // Act
            PostController.update(req, res);

            // Assert
            sinon.assert.calledWith(updatePostStub, postId, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req.body.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: req.body.author }));
        });

        // Error Scenario
        it('should return status 500 on server error', () => {
            // Arrange
            const postId = '507asdghajsdhjgasd';
            req.params = { postId };
            updatePostStub.yields(error);

            // Act
            PostController.update(req, res);

            // Assert
            sinon.assert.calledWith(updatePostStub, postId, req.body);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('findPost', () => {
        var findPostStub;
    
        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
    
            findPostStub = sinon.stub(PostModel, 'findPost');
        });
    
        afterEach(() => {
            findPostStub.restore();
        });
    
        it('should return the found post object', () => {
            // Arrange
            const postId = '507asdghajsdhjgasd';
            const foundPost = {
                _id: postId,
                title: 'Found test post',
                content: 'Found content',
                author: 'stswenguser',
                date: Date.now()
            };
    
            req.params = { postId };
    
            findPostStub.withArgs(postId).yields(null, foundPost);
    
            // Act
            PostController.findPost(req, res);
    
            // Assert
            sinon.assert.calledWith(findPostStub, postId);
            sinon.assert.calledWith(res.json, sinon.match(foundPost));
        });
    
        // Error Scenario
        it('should return status  500 on server error', () => {
            // Arrange
            const postId = '507asdghajsdhjgasd';
            req.params = { postId };
            findPostStub.yields(new Error('Database error'));
    
            // Act
            PostController.findPost(req, res);
    
            // Assert
            sinon.assert.calledWith(findPostStub, postId);
            sinon.assert.calledWith(res.status,  500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });
});
