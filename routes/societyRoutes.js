const express = require("express");

const router = express.Router();

const Societycontroller = require("../controllers/societyController");


router.post("/createSociety", Societycontroller.createSociety);

router.get("/getSociytey", Societycontroller.getSociety);

router.delete("/deleteSociety/:id", Societycontroller.deleteSociytey);

router.put("/updateSociety/:id", Societycontroller.updateSociety);

    
module.exports = router;        