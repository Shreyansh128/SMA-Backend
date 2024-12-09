const express = require('express');

const router = express.Router();

const visitorTrackingController = require('../controllers/visitorTrackingController');

const {authenticateUser , authorizeRoles} = require('../middleware/auth');




router.post("/createVisitorTracking", 
    // authenticateUser , authorizeRoles('admin'),
     visitorTrackingController.createVisitorTracking);

router.get("/getVisitorTracking", 
    // authenticateUser , authorizeRoles('admin'),
     visitorTrackingController.getVisitorTracking);

router.delete("/deleteVisitorTracking/:id", 
    // authenticateUser , authorizeRoles('admin'),
     visitorTrackingController.deleteVisitorTracking);

router.put("/updateVisitorTracking/:id", 
    // authenticateUser , authorizeRoles('admin'),
     visitorTrackingController.updateVisitorTracking);


module.exports = router;