const express = require("express");

const router = express.Router();

const AlertController = require("../controllers/AlertController.js");

const {authenticateUser , authorizeRoles} = require('../middleware/auth');




router.post("/CreateAlert",
    //  authenticateUser , authorizeRoles('admin'),
       AlertController.createAlert);

router.get("/ViewAlert",
    //  authenticateUser , authorizeRoles('admin'),
       AlertController.viewAlert);    

router.delete("/DeleteAlert/:id",
    //  authenticateUser , authorizeRoles('admin'),
       AlertController.deleteAlert);

module.exports = router;    