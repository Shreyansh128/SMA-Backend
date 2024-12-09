const express = require('express');

const router = express.Router();

const residentController = require("../controllers/residentController");

const Resident = require("../models/residentModel");

const {authenticateUser , authorizeRoles} = require('../middleware/auth');



router.post("/createResident", 
    // authenticateUser , authorizeRoles('admin'),
     Resident.uploadFiles, residentController.createResident);

router.get("/getAllResident", 
    // authenticateUser , authorizeRoles('admin'),
     residentController.getAllResident);

router.get("/getResident/:id", 
    // authenticateUser , authorizeRoles('admin'),
     residentController.getResident);

router.delete("/deleteResident/:id", 
    // authenticateUser , authorizeRoles('admin'),
     residentController.deleteResident);

router.put("/updateResident/:id", 
    // authenticateUser , authorizeRoles('admin'),
     Resident.uploadFiles, residentController.updateResident)

router.post("/vacateflat/:id", 
    // authenticateUser , authorizeRoles('admin'),
     residentController.vacateflat);


module.exports = router;