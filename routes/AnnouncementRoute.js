const express = require("express");

const router = express.Router();

const AnnouncementController = require("../controllers/AnnouncementController");

const {authenticateUser , authorizeRoles} = require('../middleware/auth');




router.post("/createAnnouncement",
    //  authenticateUser , authorizeRoles('admin'),
      AnnouncementController.createAnnouncement);

router.get("/getAnnouncement",
    //  authenticateUser , authorizeRoles('admin'),
      AnnouncementController.getAnnouncement)

router.delete("/deleteAnnouncement/:id",
    //  authenticateUser , authorizeRoles('admin'),
      AnnouncementController.deleteAnnouncement);

router.put("/updateAnnouncement/:id",
    //  authenticateUser , authorizeRoles('admin'),
      AnnouncementController.updateAnnouncement)




module.exports = router;