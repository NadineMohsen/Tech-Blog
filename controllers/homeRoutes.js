const router = require('express').Router();
const { Post, User, Comment } = require('../models');

//homepage route, gets all posts
router.get('/', (req,res)=>{
    Post.findAll({
        include:[
            {
                model:Comment,
                attributes:[
                    'id','comment_text','user_id','post_id','created_at'
                ],
                include:{
                    model:User,
                    attributes:['username']
                }
            }
            ,{
            model:User,
            attributes:['username']
            }
        ]
    })
    .then(dbPost => {
        //display a single post 
        const posts = dbPost.map(post => post.get({ plain: true }));
        res.render('homepage', { posts, loggedIn: req.session.loggedIn });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
})

//get one post with a specific id
router.get('/post/:id',(req,res)=>{
    Post.findOne({
        where:{
            id:req.params.id
                },
        attributes:[
            'id','title','post_content','created_at'
        ],
        include:[
            {
                model:Comment,
                attributes:[
                    'id','comment_text','user_id','post_id','created_at'
                ],
                include:{
                    model:User,
                    attributes:['username']
                }
            },
            {
                model: User,
                attributes: ['username']
              }
        ]
    })
    .then(dbPost => {
        if(!dbPost){
            res.status(404).json({message: "No post ound with the requested id"})
            return;
        }
        const post = dbPost.get({plain:true})
        res.render('singlepost',{post, loggedIn: req.session.loggedIn })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
})

//login route redirection
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route : homepage
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

  //signup route redirection
router.get('/signup', (req, res) => {
    res.render('signup');
  });



  module.exports = router;

