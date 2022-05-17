"use strict";

const router = require("express").Router();
const UserController = require("../controllers/UserController");
const AuthController = require("../controllers/AuthController");
const { errorHandler } = require("../middlewares/errorHandlers");
const { authAdmin } = require("../middlewares/auth");

router.get("/", (req, res) => {
  res.send("You are connected to this app");
});

router.post("/login", AuthController.login);
router.post("/register", UserController.register);

const routerListBackoffice = {
  "/user": "backoffice/user",
  "/profile": "backoffice/profile",
};

// ADMIN AUTH
for (let item in routerListBackoffice) {
  router.use(
    "/backoffice" + item,
    authAdmin,
    require("./" + routerListBackoffice[item])
  );
}

router.use(errorHandler);

module.exports = router;
