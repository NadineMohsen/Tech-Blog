const User= require('./User');
const Post= require('./Post');
const Comment= require('./Comment');

// One user can create many post
User.hasMany(Post,{
    foreignKey:'user_id'
});

//One User can create many comments
User.hasMany(Comment,{
    foreignKey:'user_id'
});

//A post belongs to only one user
Post.belongsTo(User,{
    foreignKey:'user_id'
})

//One post can have many comments
Post.hasMany(Comment,{
    foreignKey:'post_id'
})

//A comment belongs to only one user
Comment.belongsTo(User,{
    foreignKey:'user_id'
})

//A comment belongs to only one user
Comment.belongsTo(Post,{
    foreignKey:'post_id'
})

module.exports = { User, Post, Comment };