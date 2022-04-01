const router = require('express').Router();
const { User, Post } = require('../../models');
const withAuth = require('../../utils/auth');
//get users
router.get('/',(req,res)=>{
  User.findAll({
    attributes:{exclude:['password']}
  })
  .then(dbUser=>res.json(dbUser))
  .catch(err => {
    console.log(err); 
    res.status(500).json(err);
});
})

//get one user
router.get('/:id',(req,res)=>{
  User.findOne({
    attributes:{exclude:['password']} ,
    where:{
      id:req.params.id
    },
    include:[{
      model:Post,
      attributes:['id','title','post_content']
    },
    {
      model:Comment,
      attributes:['id','comment_text'],
      include:{
        model:Post,
        attributes:['title']
      }
    }
  ]
   })
   .then(dbUser => {
    if (!dbUser) {
        res.status(404).json({ message: 'No user found with the requested id'});
        return;
    }
    res.json(dbUser);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
});
})

//create user
router.post('/',(req,res)=>{
  User.create({
    username:req.body.username,
    pasword:req.body.password
  })
  .then(dbUser=>{
    req.session.save(() =>{
      req.session.user_id=dbUser.id,
      req.session.username=dbUser.username;
      req.session.loggedIn=true;
      res.json(dbUser)
    })
  })
})

//login and verify users
router.post('/login',(req,res)=>{
  User.findOne({
    where:{
      username: req.body.username
    }
  }).then(dbUser => {
    if(!dbUser){
      res.status(400).json({ message: 'No user with that username'});
      return;}
      //validate password
      const validatePassword = dbUser.checkPassword(req.body.password);

        if (!validatePassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        req.session.save(() => {
            // session variables declararion
            req.session.user_id = dbUser.id;
            req.session.username = dbUser.username;
            req.session.loggedIn = true;
      
            res.json({ user: dbUser, message: 'You are now logged in!' });
    })
  })
})

// LOG OUT 
router.post('/logout', withAuth, (req, res) => {
  if (req.session.loggedIn) {
      req.session.destroy(() => {
          res.status(204).end();
      });
  } else {
      res.status(404).end();
  }
});

// UPDATE user 
router.put('/:id', withAuth, (req, res) => {
  User.update(req.body, {
      individualHooks: true,
      where: {
          id: req.params.id
      }
  })
  .then(dbUser => {
      if (!dbUser[0]) {
          res.status(404).json({ message: 'No user found with the requested id'});
          return;
      }
      res.json(dbUser);
  })
  .catch(err => {
      console.log(err); 
      res.status(500).json(err);
  });
});

// DELETE user
router.delete('/:id', withAuth, (req, res) => {
  User.destroy({
      where: {
          id: req.params.id
      }
  })
      .then(dbUser => {
          if (!dbUser) {
              res.status(404).json({ message: 'No user found with the requested id'});
              return;
          }
          res.json(dbUser);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

module.exports = router;









