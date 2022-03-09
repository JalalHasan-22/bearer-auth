"use strict";
const { users } = require("../models/index");

function bearer(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    return users
      .validateToken(token)
      .then((user) => {
        req.user = user;
        console.log("Ammar");
        next();
      })
      .catch((error) => {
        res.status(403).send("invalid token");
        // next(`Unauthorized access: ${error}`);
      });
  } catch (error) {
    res.status(403).send("No token was entered");
  }
}

module.exports = bearer;
