"use strict";
const bcrypt = require("bcrypt");
const { verify } = require("jsonwebtoken");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

const Users = (sequelize, DataTypes) => {
  const userModel = sequelize.define("users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, SECRET);
      },
    },
  });

  userModel.authentuicateBasic = async function (username, password) {
    try {
      const user = await this.findOne({ where: { username } });
      if (!user) return;
      const valid = await bcrypt.compare(password, user.password);
      if (valid) {
        // Token
        const newToken = jwt.sign({ username: user.username }, SECRET, {
          expiresIn: "15m",
        });
        user.token = newToken;
        return user;
      }
    } catch (error) {
      return error;
    }
  };

  userModel.validateToken = async function (token) {
    const parsedToken = jwt.verify(token, SECRET);
    // if (!parsedToken) throw new Error("testing one");
    const user = await this.findOne({
      where: { username: parsedToken.username },
    });
    if (!user) return new Error("testing");
    else return user;
    //  catch (error) {
    //   console.log("error");
    //   return error;
    // }
  };

  return userModel;
};
module.exports = Users;
