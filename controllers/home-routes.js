const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const router = require('express').Router();

//homepage route (/)
//gets all posts and renders to homepage
router.get('/', (req, res) => {
    //finds all posts
    Post.findAll({
            attributes: 
            [
                'id',
                'title',
                'content',
                'created_at'
            ],
            //include comment and user models
            include: 
            [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'user_id','post_id', 'created_at'],
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
        .then(dbPost => {
            const posts = dbPost.map(post => post.get({ plain: true }));
            res.render('homepage', { posts, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//login route (/login)
router.get('/login', (req, res) => {
    //if user is logged in, redirect to homapage
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    //else redirect to login route
    res.render('login');
});

//signup route (/signup)
router.get('/signup', (req, res) => {
    //redirect to signup route
    res.render('signup');
});

//single post route (/post/:id) finds a single post
router.get('/post/:id', (req, res) => {
    //finds one post based on the requested id
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
            //includes comment and user models
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'user_id', 'post_id' ,'created_at'],
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
        .then(dbPost => {
            if (!dbPost) {
                res.status(404).json({ message: 'Bad request, no post with this id' });
                return;
            }
            const post = dbPost.get({ plain: true });
            console.log(post);
            res.render('single-post', { post, loggedIn: req.session.loggedIn })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//comments route for one post (/post-commments)
router.get('/posts-comments', (req, res) => {
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
        .then(dbPost => {
            if (!dbPost) {
                res.status(404).json({ message: 'No post found' });
                return;
            }
            const post = dbPost.get({ plain: true });

            res.render('posts-comments', { post, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;