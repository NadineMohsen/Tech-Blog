const router = require('express').Router();
const { Post, User, Comment} = require('../../models');
const withAuth = require('../../utils/auth');

// GET  posts
router.get('/', (req, res) => {
    //findAll posts
    Post.findAll({
      attributes: ['id', 'title','post_content','created_at'],
      // show news first
      order: [['created_at', 'DESC']],
      // JOIN to User table
      include: [
          {
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
          },
      ]
    }) 
        .then(dbPost => res.json(dbPost))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
  
});

// GET a single post by id 
router.get('/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 
                   'post_content', 
                   'title',
                   'created_at'
                ],
      include: [
        {
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
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPost);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// CREATE a post
router.post('/', withAuth, (req, res) => {
    //create
    Post.create({ 
        //title,content and user
        title: req.body.title,
        post_content: req.body.post_content,
        user_id: req.session.user_id
    })
        .then(dbPost => res.json(dbPost))
        .catch(err => {
            console.log(err);
            res.status(500).json(err); 
        });
});

// UPDATE post
router.put('/:id', withAuth, (req, res) => {
    Post.update({
        //update title and content of a post
        title: req.body.title,
        post_content: req.body.post_content
      },
      {//id
        where: {
          id: req.params.id
        }
    })
    .then(dbPost => {
        if (!dbPost) {
            res.status(404).json({ message: 'No post found with the requested id' });
            return;
        }
        res.json(dbPost);
    })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE post 
router.delete('/:id', withAuth, (req, res) => {
    //destroy post with specific id
    Post.destroy({
        where: {
            id: req.params.id 
        }
    })
    .then(dbPost => {
        if (!dbPost) {
            res.status(404).json({ message: 'No post found with the requested id' });
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



