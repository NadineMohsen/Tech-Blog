const { User } = require('../models');
//examples of usernames
const userData = [{
        username: 'Nadine',
        password: 'passwordnadine'

    },
    {
        username: 'John',
        password: 'examplejohn'
    },
    {
        username: 'Danny',
        password: 'Danny123'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;