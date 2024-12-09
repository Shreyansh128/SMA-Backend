const express = require("express");

const router = express.Router();

const ComplaintTrackingController = require("../controllers/ComplaintTrackingController");

const {authenticateUser , authorizeRoles} = require('../middleware/auth');



router.post("/createComplaintsTracking",
    //  authenticateUser , authorizeRoles('admin'),
     ComplaintTrackingController.createComplaintsTracking);

router.get("/viewComplaintsTracking",
    //  authenticateUser , authorizeRoles('admin'),
     ComplaintTrackingController.viewComplaintsTracking);

router.delete("/deleteComplaintsTracking/:id",
    //  authenticateUser , authorizeRoles('admin'),
     ComplaintTrackingController.deleteComplaintsTracking);

router.put("/updateComplaintsTracking/:id",
    //  authenticateUser , authorizeRoles('admin'),
     ComplaintTrackingController.updateComplaintsTracking);


module.exports = router;  