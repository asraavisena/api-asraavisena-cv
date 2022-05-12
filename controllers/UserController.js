"use strict";

const httpStatus = require("http-status-codes");
const { User } = require("../models");
const resHelpers = require("../helpers/responseHelpers");

class UserController {
  static async register(req, res, next) {
    const payload = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    };
    try {
      const result = await User.create(payload);

      delete payload.password;
      res
        .status(httpStatus.StatusCodes.CREATED)
        .json(resHelpers.success("success create an user", payload));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
