const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//dashboard 
router.get('/',withAuth,(req,res)=>{
    Post.findAll({
        where:{
            user_id: req.session.user_id
        },attributes:['id','title','post_content'],
        include:[
            {
                model:Comment,
                attributes:[
                    'id','comment_text','user_id','post_id'
                ],
                include:{
                    model:User,
                    attributed:['username']
                }
            },
            {
                model: User,
                attributes: ['username']
              }
        ].then(dbPost=>{
            const posts = dbPost.map(post => post.get({ plain: true }));
            res.render('dashboard', { posts, loggedIn: req.session.loggedIn });
        })
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
})

//edit page
router.get('/edit/:id',withAuth,(req,res)=>{
    Post.findOne({
        where:{
            id=req.params.id
        },
        attributes:[
            'id','title','post_content'
        ],
        include:[
            {
                model:Comment,
                attributes:[
                    'id','comment_text','user_id','post_id'
                ],
                include:{
                    model:User,
                    attributed:['username']
                }
            },
            {
                model: User,
                attributes: ['username']
              }
        ]
    })
    .then(dbPost => {
        const post = dbPost.get({plain:true})
        res.render('edit-post',{post, loggedIn: req.session.loggedIn })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
})

//new post
router.get('/newpost',(req,res)=>{
    res.render('newpost')
})

module.exports = router;