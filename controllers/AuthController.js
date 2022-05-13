"use strict";

const httpStatus = require("http-status-codes");
const { User } = require("../models");
const resHelpers = require("../helpers/responseHelpers");
const { jwtSign } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");

class AuthController {
  static async login(req, res, next) {
    const { email, password } = req.body;

    try {
      // CHECK EMAIL AND PASSWORD
      if (!email || !password) {
        throw { name: "Invalid Auth", message: "Email / Password is wrong" };
      }
      const findUser = await User.findOne({ where: { email } });
      if (!findUser) {
        throw { name: "Invalid Auth", message: "Email / Password is wrong" };
      }
      const verifiedPassword = comparePassword(password, findUser.password);
      if (!verifiedPassword) {
        throw { name: "Invalid Auth", message: "Email / Password is wrong" };
      }

      // ASSIGN TOKEN
      const signToken = jwtSign(
        { id: findUser.id, email: findUser.email },
        { expiresIn: "1h" }
      );
      res
        .status(httpStatus.StatusCodes.OK)
        .json(resHelpers.success("Success login", { token: signToken }));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = AuthController;
