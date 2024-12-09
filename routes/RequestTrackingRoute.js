const express = require('express');

const router = express.Router();

const requestTrackingController = require("../controllers/RequestTrackingController");

const {authenticateUser , authorizeRoles} = require('../middleware/auth');


router.post("/createRequestTracking",
    //  authenticateUser , authorizeRoles('admin'),
      requestTrackingController.createRequestTracking);

router.get("/getRequestTracking",
    //  authenticateUser , authorizeRoles('admin'),
      requestTrackingController.getRequestTracking);

router.delete("/deleteRequestTracking/:id",
    //  authenticateUser , authorizeRoles('admin'),
      requestTrackingController.deleteRequestTracking);

router.put("/updateRequestTracking/:id",
    //  authenticateUser , authorizeRoles('admin'),
      requestTrackingController.updateRequestTracking);


module.exports = router;