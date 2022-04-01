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