"use strict";

require("dotenv").config();

const express = require("express");
const createError = require("http-errors");
const logger = require("morgan");
const cors = require("cors");
const routers = require("./routes");

const app = express();

app.use(logger("dev"));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const uriPrefix = process.env.API_PREFIX || "/api/v1";
console.log(uriPrefix);
app.use(uriPrefix, routers);

app.use(function (req, res, next) {
  next(createError(404));
});

module.exports = app;
