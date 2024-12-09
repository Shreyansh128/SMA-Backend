const express = require('express');

const router = express.Router();

const security_protocol_Controller = require("../controllers/security_protocol_Controller");

const {authenticateUser , authorizeRoles} = require('../middleware/auth');




router.post("/create_security_protocol", 
    // authenticateUser , authorizeRoles('admin'),
     security_protocol_Controller.create_security_protocol);

router.get("/get_security_protocol", 
    // authenticateUser , authorizeRoles('admin'),
     security_protocol_Controller.get_security_protocol)

router.delete("/delete_security_protocol/:id", 
    // authenticateUser , authorizeRoles('admin'),
     security_protocol_Controller.delete_security_protocol)

router.put("/update_security_protocol/:id", 
    // authenticateUser , authorizeRoles('admin'),
     security_protocol_Controller.update_security_protocol);


module.exports = router;