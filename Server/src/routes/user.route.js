const express = require("express");
const UserController = require("../controllers/user.controller")
const verifyToken = require("../middlewares/auth.middleware")

const router = express.Router();


router.get("/profile", verifyToken, UserController.getProfile)

router.put("/profile", verifyToken, UserController.updateProfile)

router.delete("/profile", verifyToken, UserController.deleteProfile)

module.exports = router;
