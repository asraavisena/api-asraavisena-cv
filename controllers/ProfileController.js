"use strict";

const httpStatus = require("http-status-codes");
const { Profile, User } = require("../models");
const resHelpers = require("../helpers/responseHelpers");

class ProfileController {
  static async create(req, res, next) {
    const payload = {
      profession: req.body.profession,
      profileEmail: req.body.profileEmail,
      profileDescription: req.body.profileDescription,
      githubLink: req.body.githubLink,
      linkedInLink: req.body.linkedInLink,
      UserId: +req.user.id,
    };
    try {
      const findProfile = await Profile.findAll({
        where: { UserId: +req.user.id },
        raw: true,
      });
      if (findProfile.length > 0) {
        throw { name: "Bad Request", message: "You already have a profile" };
      }
      const createProfile = await Profile.create(payload);

      res
        .status(httpStatus.StatusCodes.CREATED)
        .json(resHelpers.success("Success create an user", createProfile));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getDetails(req, res, next) {
    const { id } = req.user;
    try {
      const findProfile = await Profile.findOne({
        where: { UserId: +id },
        include: [{ model: User, attributes: ["id", "firstname", "lastname"] }],
        raw: true,
      });
      if (!findProfile) {
        throw { name: "Not Found", message: "Profile is not found" };
      }
      res
        .status(httpStatus.StatusCodes.OK)
        .json(resHelpers.success("Success fetch data", findProfile));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async update(req, res, next) {
    const { id } = req.user;
    const payload = {
      profession: req.body.profession,
      profileEmail: req.body.profileEmail,
      profileDescription: req.body.profileDescription,
      githubLink: req.body.githubLink,
      linkedInLink: req.body.linkedInLink,
    };
    try {
      const findUser = await User.findByPk(id);
      if (!findUser) {
        throw { name: "Not Found", message: "User is not found" };
      }
      const updateProfile = await Profile.update(payload, {
        where: { UserId: +id },
        returning: true,
        individualHooks: true,
      });

      res
        .status(httpStatus.StatusCodes.OK)
        .json(resHelpers.success("Profile has been updated", updateProfile[1]));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = ProfileController;
