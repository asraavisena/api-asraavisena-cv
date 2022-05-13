"use strict";

const { jwtVerify } = require("../helpers/jwt");
const { User } = require("../models");

async function authAdmin(req, res, next) {
  // ! LATER: SET AUTH FOR MY EMAIL
  const { authorization } = req.headers;
  const accessToken = authorization && authorization.split(" ")[1];

  try {
    if (!accessToken) {
      throw { name: "Invalid Auth", message: "Invalid Access Token" };
    } else {
      const verifiedAccessToken = jwtVerify(accessToken);
      const findUser = await User.findByPk(verifiedAccessToken.id);
      if (!findUser) {
        throw { name: "Invalid Auth", message: "Invalid Access Token" };
      } else {
        req.user = verifiedAccessToken;
        next();
      }
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = {
  authAdmin,
};
