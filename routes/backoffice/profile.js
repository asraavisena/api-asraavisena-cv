"use strict";
const router = require("express").Router();
const ProfileController = require("../../controllers/ProfileController");

router.post("/create", ProfileController.create);
router.get("/details", ProfileController.getDetails);
router.put("/update", ProfileController.update);

module.exports = router;
