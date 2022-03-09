"use strict";
const base_64 = require("base-64");
const { users } = require("../models/index");

function basicAuth(req, res, next) {
  try {
    const encoded = req.headers.authorization.split(" ")[1]; //req.headers.authorization.split(" ").pop()
    const decoded = base_64.decode(encoded);
    const [username, password] = decoded.split(":");

    return users
      .authentuicateBasic(username, password)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((error) => {
        res.status(403).send(error);
      });
  } catch (error) {
    res.status(403).send(error);
  }
}

module.exports = basicAuth;
