const express = require("express");

const router = express.Router();

const FacilityController = require("../controllers/FacilityController");

const {authenticateUser , authorizeRoles} = require('../middleware/auth');




router.post("/createFacility",
    //  authenticateUser , authorizeRoles('admin'),
      FacilityController.createFacility);

router.get("/getFacility",
    //  authenticateUser , authorizeRoles('admin'),
      FacilityController.getFacility);

router.delete("/deleteFacility/:id",
    //  authenticateUser , authorizeRoles('admin'),
      FacilityController.deleteFacility);

router.put("/updateFacility/:id",
    //  authenticateUser , authorizeRoles('admin'),
      FacilityController.updateFacility);



module.exports = router;