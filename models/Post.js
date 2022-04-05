const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create a model for all posts
class Post extends Model {}

//define post table
Post.init(
    {
          //define id column: integer,primary key,not null
          id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          //define title column: string, not null
          title: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          //define content column: string, not null
          content:{
            type: DataTypes.TEXT,
            allowNull: false,
          },
          //define user id column: integer,reference for user table id
          user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'user',
              key: 'id',
            },
          },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
      }
)

module.exports = Post;