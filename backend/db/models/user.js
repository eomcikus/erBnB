'use strict';
const bcrypt = require('bcryptjs');
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, firstName, lastName, username, userPhoto, email } = this; // context will be the User instance
      return { id, firstName, lastName, username, userPhoto, email };
    }
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }
    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }
    static async signup({ firstName, lastName, username, userPhoto, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        firstName,
        lastName,
        username,
        userPhoto,
        email,
        hashedPassword,
      });
      return await User.scope('currentUser').findByPk(user.id);
    }
    static associate(models) {
      User.hasMany(
        models.Booking,
        { foreignKey: 'userId'}
      )
      User.hasMany(
        models.Review,
        { foreignKey: 'userId'}
      )
      User.hasMany(
        models.Spot,
        { foreignKey: 'ownerId'}
      )
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.");
          }
        }
      }
    },
    userPhoto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256]
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "username", "email", "createdAt", "updatedAt"]
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword", "createdAt", "updatedAt"],
                        include: ["id", "firstName", "lastName", "username", "userPhoto", "email"] }
        },
        loginUser: {
          attributes: {}
        }
      }
    }
  );
  return User;
};
