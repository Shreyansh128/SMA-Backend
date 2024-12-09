const express = require("express");

const router = express.Router();

const ProfileController = require("../controllers/profileController");

const User = require("../models/UserModel");

const {authenticateUser , authorizeRoles} = require('../middleware/auth');




router.get("/viewProfile",
    //  authenticateUser , authorizeRoles('admin'),
      ProfileController.viewProfile);

router.put("/updateProfile/:id",
    //  authenticateUser , authorizeRoles('admin'),
      User.uploadedAvatar, ProfileController.updateProfile);

router.delete("/deleteProfile/:id",
    //  authenticateUser , authorizeRoles('admin'),
      ProfileController.deleteProfile);

router.get("/getSingleProfile/:id",
    //  authenticateUser , authorizeRoles('admin'),
      ProfileController.getSingleProfile);

module.exports = router;  