"use strict";

const { start } = require("./src/server");
require("dotenv").config();
const { db } = require("./src/auth/models/index");

db.sync().then(() => {
  start(process.env.PORT);
});
