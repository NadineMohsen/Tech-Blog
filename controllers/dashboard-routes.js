const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//dashboard route (/dashboard), gets all posts
router.get('/', withAuth, (req, res) => {
    //finds all posts for loggedin user
    Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
            ],
            //includes comment and user models
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        //renders posts to dashboard page
        .then(dbPost => {
            const posts = dbPost.map(post => post.get({ plain: true }));
            res.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//edit post route (/dashboard/edit/:id) 
router.get('/edit/:id', withAuth, (req, res) => {
    //finds requested post
    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
            ],
            //includes user and comments models
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
            //renders post to edit post page
            const post = dbPost.get({ plain: true });
            res.render('edit-post', { post, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})


//create new post route (/dashboard/new) 
router.get('/new', (req, res) => {
    //renders new-post page
    res.render('new-post');
});



module.exports = router;