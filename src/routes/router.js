"use strict";

const express = require("express");
const bcrypt = require("bcrypt");
const base_64 = require("base-64");
const router = express.Router();
const { users } = require("../auth/models/index");
const basicAuth = require("../auth/middleware/basicAuth");
const bearerAuth = require("../auth/middleware/bearerAuth");

// Routes
router.get("/users", getAllUsers);
router.post("/signup", signupHandler);
router.post("/signin", basicAuth, signinHandler);
router.get("/secretstuff", bearerAuth, secretStuffHandler);

// Handlers
async function signupHandler(req, res, next) {
  //   console.log(base_64.decode(req.headers.authorization.split(" ")[1]));
  let { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 14);
    const newUser = await users.create({
      username: username,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error.message);
    res.send(error.message);
  }
}

function signinHandler(req, res) {
  res.status(200).json({
    user: {
      id: req.user.id,
      username: req.user.username,
    },
    token: req.user.token,
  });
}

function secretStuffHandler(req, res) {
  res.status(200).send(`Welcome ${req.user.username}!`);
}

// for testing purposes only
// Please disregard
async function getAllUsers(req, res) {
  const allUsers = await users.findAll();
  res.status(200).json(allUsers);
}

module.exports = router;
