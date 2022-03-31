const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create a model for all posts
class Post extends Model {}

Post.init(
    {
          id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len:[2]
            }
          },
          text:{
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
              len:[2]
          }
          },
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
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'project',
      }
)

module.exports = Project;