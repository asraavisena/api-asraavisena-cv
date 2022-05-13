"use strict";
const router = require("express").Router();
const UserController = require("../../controllers/UserController");

router.get("/details", UserController.getDetails);
router.put("/update", UserController.update);

module.exports = router;
