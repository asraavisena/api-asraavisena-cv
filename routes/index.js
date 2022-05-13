"use strict";

const router = require("express").Router();
const UserController = require("../controllers/UserController");
const AuthController = require("../controllers/AuthController");
const { errorHandler } = require("../middlewares/errorHandlers");

router.get("/", (req, res) => {
  res.send("You are connected to this app");
});

router.post("/login", AuthController.login);
router.post("/register", UserController.register);

router.use(errorHandler);

module.exports = router;
