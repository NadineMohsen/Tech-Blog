const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// comment route (/comments) gets all comments
router.get('/', (req, res) => {
    //finds all comments
    Comment.findAll({})
        .then(dbComment => res.json(dbComment))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

//one post comments route (/comments/:id) gets comments for a single post
router.get('/:id', (req, res) => {
    //finds all comments for  a single post
    Comment.findAll({
            where: {
                id: req.params.id
            }
        })
        .then(dbComment=> res.json(dbComment))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

//new comment route (/comments)
router.post('/', withAuth, (req, res) => {
    if (req.session) {
        //create new comment
        Comment.create({
                comment_text: req.body.comment_text,
                post_id: req.body.post_id,
                user_id: req.session.user_id,
            })
            .then(dbComment => res.json(dbComment))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    }
});

//update comment route (/comments/:id)
router.put('/:id', withAuth, (req, res) => {
    //update text
    Comment.update({
        comment_text: req.body.comment_text
    }, 
    {   //specific comment
        where: {
            id: req.params.id
        }
    })
    .then(dbComment => {
        if (!dbComment) {
            res.status(404).json({ message: 'Bad request, no comment with this id' });
            return;
        }
        res.json(dbComment);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


//delete one commment route (/comments/:id)
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbComment => {
        if (!dbComment) {
            res.status(404).json({ message: 'Bad request, no comment with this id' });
            return;
        }
        res.json(dbComment);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
module.exports = router;