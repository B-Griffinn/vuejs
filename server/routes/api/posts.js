const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();

    res.send(await posts.find({}).toArray());
})


// Add Posts

router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    //comes with mondo db
     await posts.insertOne({
            text: req.body.text,
            createdAt: new Date()
     });

     res.status(201).send();
})


// Delete Post

router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();

    await posts.deleteOne({
        _id: new mongodb.ObjectID(req.params.id),
    });

    res.status(200).send();
})



// Connect to post collection
async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://abc123:1234@001.lltkh.mongodb.net/001?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true // prevents (node:25672) DeprecationWarnin
    });

    return client.db('001').collection('posts')
}

module.exports = router;