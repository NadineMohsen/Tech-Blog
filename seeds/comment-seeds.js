const { Comment } = require('../models');
//comment examples
const commentData = [{
        comment_text: "Very nice blog",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "Please provide the source",
        user_id: 2,
        post_id: 2
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;