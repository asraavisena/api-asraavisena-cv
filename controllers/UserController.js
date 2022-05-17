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
        .json(resHelpers.success("Success create an user", payload));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getDetails(req, res, next) {
    const { id } = req.user;
    try {
      const findUser = await User.findByPk(id, { raw: true });

      const result = { ...findUser };
      delete result.password;
      res
        .status(httpStatus.StatusCodes.OK)
        .json(resHelpers.success("Success fetch data", result));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async update(req, res, next) {
    const { id } = req.user;
    const payload = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
    };

    try {
      const findUser = await User.findByPk(id);
      if (!findUser) {
        throw { name: "Not Found", message: "User is not found" };
      }

      const updateUser = await User.update(payload, {
        where: { id },
        returning: true,
        individualHooks: true,
      });

      res
        .status(httpStatus.StatusCodes.OK)
        .json(resHelpers.success("User has been updated", updateUser[1]));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
