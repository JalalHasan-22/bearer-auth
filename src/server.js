"use strict";

const express = require("express");
const app = new express();
const errorHandler = require("./middleware/500");
const notFoundHandler = require("./middleware/404");
const authRoutes = require("./routes/router");

require("dotenv").config();

// Middlewares and routes
app.use(express.json());
app.use(authRoutes);

app.get("/", (req, res) => {
  res.status(200).send("home route");
});

function start(port) {
  app.listen(port, () => {
    console.log(`server running on port 3000`);
  });
}

app.use(errorHandler);
app.use("*", notFoundHandler);

module.exports = {
  app: app,
  start: start,
};
