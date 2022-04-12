const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

//user route gets all users (/users)
router.get('/', (req, res) => {
  //finds all usernames
    User.findAll({
            attributes: { exclude: ['password'] }
        })
        .then(dbUser => res.json(dbUser))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


//single user route (/users/:id) finds one username
router.get('/:id', (req, res) => {
    User.findOne({
      //exclude pass
            attributes: { exclude: ['password'] },
            where: {
                id: req.params.id
            },
            //include post and comment models
            include: [{
                    model: Post,
                    attributes: [
                        'id',
                        'title',
                        'content',
                        'created_at'
                    ]
                },

                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'created_at'],
                    include: {
                        model: Post,
                        attributes: ['title']
                    }
                },
                {
                    model: Post,
                    attributes: ['title'],
                }
            ]
        })
        .then(dbUser => {
            if (!dbUser) {
                res.status(404).json({ message: 'No user found, Please try again' });
                return;
            }
            res.json(dbUser);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


//create new user route (/users)
router.post('/', (req, res) => {
  //new username and new pass
    User.create({
        username: req.body.username,
        password: req.body.password
    })

    .then(dbUser => {
            req.session.save(() => {
                req.session.user_id = dbUser.id;
                req.session.username = dbUser.username;
                req.session.loggedIn = true;
                res.json(dbUser);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


//login route (/users/login)
router.post('/login', (req, res) => {
  //finds user based on username
    User.findOne({
            where: {
                username: req.body.username
            }
        }).then(dbUser => {
            if (!dbUser) {
                res.status(400).json({ message: 'No user found with these details, please try again' });
                return;
            }
            //make sure it's the correct password
            const validPassword = dbUser.checkPassword(req.body.password);
            //in case of a wrong password
            if (!validPassword) {
                res.status(400).json({ message: 'Wrong password, please try again' });
                return;
            }
            //saves session
            req.session.save(() => {
                req.session.user_id = dbUser.id;
                req.session.username = dbUser.username;
                req.session.loggedIn = true;

                res.json({ user: dbUser, message: 'Logged in!' });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//logout route (/users/logout) 
router.post('/logout', (req, res) => {
  //ends session
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;