const express = require('express');

const router = express.Router();

const MaintenanceController = require("../controllers/MaintenanceController");

const {authenticateUser , authorizeRoles} = require('../middleware/auth');



router.post("/createMaintenance",
    //  authenticateUser , authorizeRoles('admin'),
      MaintenanceController.createMaintenance);

router.get("/getAllMaintenances",
    //  authenticateUser , authorizeRoles('admin'),
      MaintenanceController.getAllMaintenances);

router.get("/password_match", MaintenanceController.password_match);

router.put("/updateMaintenance/:id",
    //  authenticateUser , authorizeRoles('admin'),
      MaintenanceController.updateMaintenance);

router.delete("/deleteMaintenance/:id",
    //  authenticateUser , authorizeRoles('admin'),
      MaintenanceController.deleteMaintenance);

router.get("/getMaintenance/:id",
    //  authenticateUser , authorizeRoles('admin'),
      MaintenanceController.getMaintenance);


module.exports = router;