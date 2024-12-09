const express = require('express');

const router = express.Router();

const securitygaurdModel = require("../models/SecuritygaurdModel");

const SecuritygaurdController = require("../controllers/SecuritygaurdController");

const {authenticateUser , authorizeRoles} = require('../middleware/auth');




router.post("/createSecuritygaurd",
    //  authenticateUser , authorizeRoles('admin'), 
    securitygaurdModel.uploadedAvatar, SecuritygaurdController.createSecuritygaurd);

router.get("/getSecuritygaurd",
    //  authenticateUser , authorizeRoles('admin'), 
    SecuritygaurdController.getSecuritygaurd);

router.delete("/deleteSecuritygaurd/:id",
    //  authenticateUser , authorizeRoles('admin'), 
    SecuritygaurdController.deleteSecuritygaurd);

router.put("/updateSecuritygaurd/:id",
    //  authenticateUser , authorizeRoles('admin'), 
    securitygaurdModel.uploadedAvatar, SecuritygaurdController.updateSecuritygaurd);


module.exports = router;        