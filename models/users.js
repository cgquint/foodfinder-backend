const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define("users", {
      
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        }
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },

      mobile: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          not: ["[a-z]", "i"]
        }
      },

      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },

      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },

      current_lat: {
        type: DataTypes.DECIMAL,
        allowNull: true
      },

      current_lng: {
        type: DataTypes.DECIMAL,
        allowNull: true
      },

      profile_pic: {
          type: DataTypes.STRING,
          allowNull: true
      },

      verification_code: {
          type: DataTypes.INTEGER,
          allowNull: true
      },

      last_login: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          allowNull: false
      },

      birth_date: {
          type: DataTypes.DATE,
          allowNull: true
      },

      public: {
          type: DataTypes.TINYINT,
          allowNull: true
      },

    }, {
      classMethods: {
          generateHash(password) {
              return bcrypt.hash(password, bcrypt.genSaltSync(8));
          },
          validPassword(password) {
              return bcrypt.compare(password, this.password);
          }
      }
  });
  
    return users;
}