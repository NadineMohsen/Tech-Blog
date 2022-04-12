const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

//posts route (/posts) gets all posts
router.get('/', (req, res) => {
    Post.findAll({
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
            ],
            // sort by desc order
            order: [
                ['created_at', 'DESC']
            ],
            //include user and comment models
            include: [{
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
        .then(dbPost => res.json(dbPost.reverse()))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

//single post route (/posts/:id) finds one post
router.get('/:id', (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'content',
                'title',
                'created_at'
            ],
            //includes user and comment models
            include: [{
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
        .then(dbPost => {
            if (!dbPost) {
                res.status(404).json({ message: 'No post found' });
                return;
            }
            res.json(dbPost);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//new post route (/posts)
router.post('/', withAuth, (req, res) => {
  //create a new post
    Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        })
        .then(dbPost => res.json(dbPost))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//update an existing post (/posts/:id)
router.put('/:id', withAuth, (req, res) => {
    Post.update({
            title: req.body.title,
            content: req.body.content
        }, 
        {
            where: {
                id: req.params.id
            }
        })
        .then(dbPost => {
            if (!dbPost) {
                res.status(404).json({ message: 'No post found' });
                return;
            }
            res.json(dbPost);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//delete a post route (/posts/:id)
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPost => {
        if (!dbPost) {
            res.status(404).json({ message: 'No post found' });
            return;
        }
        res.json(dbPost);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;