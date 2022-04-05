const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

//create a comment table
Comment.init({
    //define id column: integer, primary key 
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      //define comment text column: string,not null and at least 4 characters
      comment_text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len:[4]
        }
      },
      //define user id column: integer,not null and references user id from user model
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      //define post id column: integer,not null and references post id from post model
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'post',
            key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
      }
    )

    module.exports = Comment;