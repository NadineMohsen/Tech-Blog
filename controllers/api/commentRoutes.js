const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET comments
router.get('/', (req, res) => {
    Comment.findAll({

    })
        .then(dbComment => res.json(dbComment))
        .catch(err => {
            console.log(err); 
            res.status(500).json(err); 
        })
});

// CREATE a new comment 
router.post('/', withAuth, (req, res) => {
    // check if loggedin
    if (req.session) {
    Comment.create({
        //text
        comment_text: req.body.comment_text, 
        //post id
        post_id: req.body.post_id,
        // use id
        user_id: req.session.user_id,
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    }
});

// DELETE a COMMENT 
router.delete('/:id', withAuth, (req, res) => {
    //destroy
    Comment.destroy({
        where: {
            id: req.params.id 
        }
    })
    .then(dbComment => {
        if (!dbComment) {
            res.status(404).json({ message: 'No comment was found' });
            return;
        }
        res.json(dbComment);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;