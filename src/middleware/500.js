"use strict";

module.exports = (error, req, res, next) => {
  res.status(403).json({
    code: 403,
    message: error.message,
  });
};
